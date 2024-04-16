import {Router, json} from "express"
import {PrismaClient} from '@prisma/client'
import {autenticarToken} from '../auth/autenticacion.js'

const router = Router();
const prisma = new PrismaClient();

router.get('/data',autenticarToken,async (req,res)=>{

    const {id} = req.headers;


    
    const Device = await prisma.device.findFirst({
        where:{
            id: parseInt(id) 
        }
    })

    if(Device){
        const data = await prisma.sensor.findMany({
            where: {
                sensorId:id
            },
            include:{
                idDevice:true
            }
        });
    
        if(Object.values(data).length!=0){
            res.json(data);
        }else{
            res.status(404).send('Device not dat');
        }
    }else{
        res.status(404).send('Device not exist');
    }
});


router.post('/sensor',autenticarToken, async (req,res)=>{
    const {id, value} = req.headers;

    const Device = await prisma.device.findFirst({
        where:{
            id: parseInt(id) 
        }
    })

    if(Device){
        console.log(Device.nameDevice);
        await prisma.sensor.create({
            data: {
                sensorId: Device.id,
                value: parseFloat(value)
            }
        })
    
        console.log(parseFloat(value) );
        res.json('device:'+Device.nameDevice+','+'value:'+value+','+'type:'+Device.type)
    }else{
        res.status(404).send('Err 404 \n Devices not exist')
    }

});

export default router;