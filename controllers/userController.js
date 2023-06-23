import User from "../models/User.js";
import { createId, createJWT } from "../helpers/index.js";

const register = async (req, res) => {
  // Duplicate Reg

  const { email } = req.body;
  const existUser = await User.findOne({ email: email });

  if (existUser) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const user = new User(req.body);
    user.token = createId();
    const userSaved = await user.save();
    res.json(userSaved);
  } catch (error) {
    console.log(error);
  }
};

const userAuth = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email: email });

  // Comprobar si user existe
  if (!user) {
    const error = new Error("No existe el user");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar si user existe
  if (!user.confirm) {
    const error = new Error("Tu cuenta no esta confirmada");
    return res.status(403).json({ msg: error.message });
  }

  // Comprobar password
  if (await user.passwordVerify(password)) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: createJWT(user._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};

const confirm = async (req, res) => {
  const { token } = req.params;
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error("Token no valido");
    return res.status(403).json({ msg: error.message });
  }
  try {
    userConfirm.confirm = true;
    userConfirm.token = "";
    await userConfirm.save();
    res.json({ msg: "Token confirm" });
  } catch (error) {
    console.log(error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });

  // Comprobar si user existe
  if (!user) {
    const error = new Error("No existe el usuario");
    return res.status(404).json({ msg: error.message });
  }

  try {
    user.token = createId();
    user.save();
    return res.json({ msg: "Hemos enviado un email con las intrucciones" });
  } catch (error) {
    console.log(error);
  }
};

const validateToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await User.findOne({ token });

  if (validToken) {
    res.json({ msg: "Token Válido" });
  } else {
    const error = new Error("Token inválido");
    return res.status(404).json({ msg: error.message });
  }
};

const newPasssword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const usuario = await User.findOne({ token });

  if (usuario) {
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();
    } catch (error) {
      console.log(error);
    }

    res.json({ msg: "Password modificado" });
  } else {
    const error = new Error("Token inválido");
    return res.status(404).json({ msg: error.message });
  }
};

export {
  register,
  userAuth,
  confirm,
  forgotPassword,
  validateToken,
  newPasssword,
};
