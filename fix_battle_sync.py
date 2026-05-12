import sys

filename = '/app/frontend_gnosis-main/battle-service/socket/handlers.js'
with open(filename, 'r') as f:
    code = f.read()

# Fix the 1v1 battle sync:
# The issue is that `isCorrect` and `xpEarned` are calculated immediately when `quiz:answer` is received.
# It emits `quiz:answer_result` to that SPECIFIC socket immediately.
# If the frontend is waiting for `quiz:answer_result` to end the game or show the results page early, it might trigger the end screen for player 1.
# But wait, the prompt says "if player 1 answers in 3 seconds, player 2's game ends immediately".
# The `activePlayers` check:
# const activePlayers = players.filter(p => io.sockets.sockets.has(p.socketId));
# const allAnswered = activePlayers.every(p => p.answered);
# If player 1 answers, and player 2's socketId is NOT in `io.sockets.sockets` (maybe they disconnected?), it forces next question.
# But `io.sockets.sockets.has(p.socketId)` only works reliably if the sockets are in the same node process.
# We should probably just check `players.every(p => p.answered)`.

old_answered_logic = """
      // Filter out disconnected or inactive players before deciding if everyone answered
      const activePlayers = players.filter(p => io.sockets.sockets.has(p.socketId));
      const allAnswered = activePlayers.every(p => p.answered);
"""

new_answered_logic = """
      // Filter out disconnected or inactive players before deciding if everyone answered
      // Fix: Don't rely on io.sockets.sockets.has() as it might not be fully accurate, just check all players
      const allAnswered = players.every(p => p.answered);
"""

new_code = code.replace(old_answered_logic, new_answered_logic)

with open(filename, 'w') as f:
    f.write(new_code)

print("Updated handlers.js")
