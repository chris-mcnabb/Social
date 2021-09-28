import './chatOnline.css';
import {useEffect, useState} from "react";
import axios from "axios";

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    useEffect(() =>{
        const getFriends = async () => {
            try{
                const res = await axios.get("/users/friends/" + currentId);
                setFriends(res.data)
            }catch(err){
                console.log(err)
            }
        };
        getFriends()
    }, [currentId]);

    useEffect(() => {
        setOnlineFriends(friends.filter(f => onlineUsers.includes(f._id)))
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try{
            const res = await axios.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div className='chatOnline'>
            {onlineFriends.map(o =>(


            <div className="chatOnlineFriend" onClick={()=>handleClick(o)}>
                <div className="chatOnlineImgContainer">
                    <img src={o?.profilePicture ? PF + o.profilePicture : PF + "Tommy.jpeg"} alt="" className='chatOnlineImg'/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{o?.username}</span>
            </div>
            ))}
        </div>
    );
};

export default ChatOnline;
