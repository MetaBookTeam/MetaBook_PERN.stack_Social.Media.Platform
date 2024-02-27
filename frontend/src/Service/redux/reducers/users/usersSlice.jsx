import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    userProfile: {},
    // userProfile: {
    //   bio: null,
    //   birthday: null,
    //   city: null,
    //   country: null,
    //   cover_photo: null,
    //   created_at: null,
    //   email: null,
    //   first_name: null,
    //   gender: null,
    //   id: null,
    //   image: null,
    //   is_deleted: null,
    //   last_name: null,
    //   password: null,
    //   phone_number: null,
    //   role_id: null,
    //   school: null,
    //   state: null,
    //   user_id: null,
    //   user_name: null,
    // },
    friendProfile: {},
  },

  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
      // console.log(action.payload);
      // state.userProfile = {
      //   bio           :          action.payload.bio          ,
      //   birthday      :     action.payload.birthday     ,
      //   city          :         action.payload.city         ,
      //   country       :      action.payload.country      ,
      //   cover_photo   :  action.payload.cover_photo  ,
      //   created_at    :   action.payload.created_at   ,
      //   email         :        action.payload.email        ,
      //   first_name    :   action.payload.first_name   ,
      //   gender        :       action.payload.gender       ,
      //   id            :           action.payload.id           ,
      //   image         :        action.payload.image        ,
      //   is_deleted    :   action.payload.is_deleted   ,
      //   last_name     :    action.payload.last_name    ,
      //   password      :     action.payload.password     ,
      //   phone_number  : action.payload.phone_number ,
      //   role_id       :      action.payload.role_id      ,
      //   school        :       action.payload.school       ,
      //   state         :        action.payload.state        ,
      //   user_id       :      action.payload.user_id      ,
      //   user_name     :    action.payload.user_name    ,
      // };
    },
    setFriendProfile: (state, action) => {
      state.friendProfile = action.payload;
    },
    setUpdateUserInformation: (state, action) => {
      // state.users = action.payload;
      state.users = state.users.map((user) => {
        if (user.id == action.payload.id) {
          return state.users == action.payload;
        }
      });
    },
  },
});

export const { setUsers, setUserProfile, setFriendProfile ,setUpdateUserInformation} =
  usersSlice.actions;
export default usersSlice.reducer;
