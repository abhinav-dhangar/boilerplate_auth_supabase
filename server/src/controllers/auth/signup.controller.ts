import { supabase } from "@utils/supa.conn";
import { Request, Response } from "express";
const dotenv = require("dotenv").config();

export const signupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
     options: {
      emailRedirectTo: `${process.env.FRONTEND_URL}`,
    },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user });
};
