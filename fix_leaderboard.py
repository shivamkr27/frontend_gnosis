import sys

filename = '/app/frontend_gnosis-main/frontend/src/pages/Leaderboard.jsx'
with open(filename, 'r') as f:
    code = f.read()

# Fix mapping structure for both global and friends:
# - Limit to Top 10

old_use_effect = """
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        if (activeTab === "global") {
          const res = await api.get(
            `/xp/leaderboard/global?currentUserId=${user.id}`,
          );
          setBoard(res.data.leaderboard || []);
        } else {
          // Fix for Friends Leaderboard: correctly format friendIds query and default array
          const friendsRes = await api.get("/auth/friends");
          const friendsList = Array.isArray(friendsRes.data) ? friendsRes.data : [];
          const friendIds = [
            user.id,
            ...friendsList.map((friend) => friend.id),
          ].join(",");

          const res = await api.get(
            `/xp/leaderboard/friends?userId=${user.id}&friendIds=${friendIds}`,
          );
          setBoard(
            res.data.map((entry) => ({
              ...entry,
              xp: entry.totalXp, // Map totalXp to xp for uniform display
            })),
          );
        }
      } catch (err) {
        console.error(err);
        setBoard([]);
      } finally {
        setLoading(false);
      }
    };
"""

new_use_effect = """
    const fetchLeaderboard = async () => {
      setLoading(true);
      try {
        if (activeTab === "global") {
          const res = await api.get(
            `/xp/leaderboard/global?currentUserId=${user.id}`,
          );
          const boardData = res.data.leaderboard || [];
          setBoard(boardData.slice(0, 10)); // Top 10 limit
        } else {
          // Fix for Friends Leaderboard: correctly format friendIds query and default array
          const friendsRes = await api.get("/auth/friends");
          const friendsList = Array.isArray(friendsRes.data) ? friendsRes.data : [];
          const friendIds = [
            user.id,
            ...friendsList.map((friend) => friend.id),
          ].join(",");

          const res = await api.get(
            `/xp/leaderboard/friends?userId=${user.id}&friendIds=${friendIds}`,
          );
          const formattedBoard = res.data.map((entry, index) => ({
              ...entry,
              xp: entry.totalXp, // Map totalXp to xp for uniform display
              rank: index + 1 // Add index as rank since friends API returns sorted
            }));
          setBoard(formattedBoard.slice(0, 10)); // Top 10 limit
        }
      } catch (err) {
        console.error(err);
        setBoard([]);
      } finally {
        setLoading(false);
      }
    };
"""

code = code.replace(old_use_effect, new_use_effect)

with open(filename, 'w') as f:
    f.write(code)

print("Updated Leaderboard.jsx")
