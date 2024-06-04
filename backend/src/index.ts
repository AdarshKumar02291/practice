const express = require("express");
const app = express();

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
app.use(express.json())




app.post("/api/v1/signin", (req: any, res: any) => {
  res.json({ msg: "hellow from signin" });
});
app.post("/api/v1/signup",async  (req: any, res: any) => {
    const body = await req.body;
    const user = await prisma.user.findFirst({
        where: {
            username: body.username
        }
      })
    if(user)
        return res.json({"msg":"user already"})
	try {
		const user = await prisma.user.create({
			data: {
				username: body.username,
				password: body.password,
                firstName :body.firstName,
                lastName:body.lastName
			}
		});
	
		return res.json({"msg":'user created'});
	} catch(e) {
		return res.status(403);
	}
  
});

app.listen(3000);

// postgresql://adarsh.kumar02291:9ZDFl7ChTcYH@ep-bitter-field-a1v4l1da.ap-southeast-1.aws.neon.tech/test?sslmode=require
