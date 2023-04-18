
import UsersODM from "../Models/UsersODM";

const seedUser = async () => {
  const user = new UsersODM();
  await user.create({ email: 'teste@teste.com', password: '123456', cargo: 'administrador' });
};

export default seedUser