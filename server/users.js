const users = [];

const addUser = ({ id, name, room, status }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  console.log( id, name, room, status )
  users.find((user) => console.log(user.room , room , user.name , name , user.status ,status));

  const existingUser = users.find((user) => user.room === room && user.name === name && user.status === status);

  users.find((user) => console.log(user.room , room , user.name , name , user.status ,status));

  if(!name || !room) return { error: 'Username and room are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const user = { id, name, room, status };

  users.push(user);

  return { user };
}

const leftUser = (id,status) => {
  
  const index = users.findIndex((user) => user.id === id);

  if(index != -1){
    users[index].status = status;
    return users[index]
  }

  //if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, leftUser, getUser, getUsersInRoom };