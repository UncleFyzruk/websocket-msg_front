import axios from "axios";

export const fetchFriends = async (friendship_status)=> {
    try {
        const response = await axios.get(`http://localhost:8000/friends?friendship_status=${friendship_status.current}`,
            { withCredentials: true });
        const friendsData = response.data.flatMap((user) =>
            user.users_friends.flatMap((friend) =>
                friend.useres_relationship.map((rel) =>({
                    key: friend.id_friendship,
                    label: rel.user_username,
                }))
            )
            );
        return friendsData
    } catch (e) {
      console.error('Error fetching friends', e);
      throw e
    }
};