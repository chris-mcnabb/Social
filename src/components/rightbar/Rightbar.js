import './rightbar.css';
import {Users} from "../../dummyData";
import Online from "../online/Online";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext";
import {Add, Remove} from "@material-ui/icons"

const Rightbar = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.following.includes(user?.id));

    useEffect(() =>{
        const getFriends = async () => {
            try{
                const friendList = await axios.get("/users/friends/" + user._id);
                setFriends(friendList.data);
            }catch(err){
                console.log(err)
            }
        };
        getFriends();
    },[user]);

    const handleClick = async () => {
        try{
            if(followed){
                await axios.put("/users/" + user._id + "/unfollow",
                    {userId: currentUser._id});
                dispatch({type: 'UNFOLLOW', payload:user._id})
            }else{
                await axios.put("/users/" + user._id + "/follow",
                    {userId: currentUser._id});
                dispatch({type: 'FOLLOW', payload:user._id})
            }
        }catch(err){
            console.log(err)
        }
        setFollowed(!followed)
    }

    const HomeRightBar = () => {
        return (
            <>
                <div className="birthdayContainer">
                    <img src="/assets/birthday.jpg" alt="" className="birthdayImg"/>
                    <span className="birthdayText"><b>Mama</b> and <b>3 other friends</b> have birthday's today!!</span>
                </div>
                <img src="/assets/advert.jpg" alt="" className="rightBarAd"/>
                <h4 className="rightBarTitle">Online Friends</h4>
                <ul className="rightBarFriendList">
                    {Users.map(u => (
                        <Online key={u.id} user={u}/>
                    ))}
                </ul></>
        )
    };

    const ProfileRightBar = () => {
        return (
            <>
                {user.username !== currentUser.username && (
                    <button className="rightBarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                )}
             <h4 className="rightBarTitle">User Information</h4>
                <div className="rightBarInfo">
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">City:</span>
                        <span className="rightBarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">From:</span>
                        <span className="rightBarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightBarInfoItem">
                        <span className="rightBarInfoKey">Relationship:</span>
                        <span className="rightBarInfoValue">{user.relationship === 1 ? 'Married' : user.relationship === 2 ? 'Single' : ' '}</span>
                    </div>
                </div>
                <h4 className="rightBarTitle">User Friends</h4>
                <div className="rightBarFollowings">
                    {friends.map(friend => (
                   <Link to ={"/profile/" + friend.username} style={{textDecoration: "none"}}>
                       <div className="rightBarFollowing">
                           <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "Happy.jpeg"} alt="" className="rightBarFollowingImg"/>
                           <span className="rightBarFollowingName">{friend.username}</span>
                       </div>
                   </Link>
                    ))}

                </div>
            </>
        )
    };

    return (

        <div className="rightBar">
            <div className="rightBarWrapper">
                {user ? <ProfileRightBar/> : <HomeRightBar/>}
            </div>
        </div>

    );
};

export default Rightbar;
