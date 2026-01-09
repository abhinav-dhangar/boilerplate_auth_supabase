import { redisClient } from "@utils/redis.conn";
import { supabase } from "@utils/supa.conn";
import { Request, Response } from "express";
require("dotenv").config();
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let deviceId: string = req.deviceId;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });

  const userKey = `user:${data.user?.id}:device:${deviceId}`;
  const ifPresent = await redisClient.hget(userKey, "id");

  await redisClient.hset(userKey, {
    user_id: data.user.id,
    email: data.user.email || "",
    deviceId,
    updated_at: new Date().toISOString(),
    refresh_token: data.session.refresh_token, // always replace (rotation)
  });

  res.json({ session: data.session });
};
