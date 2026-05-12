import re

# In the previous python script, I accidentally removed the `if (results) { ... }` block and the quiz view logic which might be necessary if this component handles Active quiz as well.
# Let's inspect what ParticipantLobby.jsx looks like now.

with open('frontend_gnosis-main/frontend/src/pages/ParticipantLobby.jsx', 'r') as f:
    content = f.read()

print("File Length: ", len(content.splitlines()))
print("Matches for 'if (results)': ", "if (results)" in content)
print("Matches for 'if (questionPayload)': ", "if (questionPayload)" in content)
