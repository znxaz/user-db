import { PrismaClient } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class prismaService extends PrismaClient
{  
    
    constructor(config : ConfigService)
        {
            super
            ({ 
                datasources:
                {
                    
                    db: 
                    {
                        url: config.get('DATABASE_URL')
                    }
                    
                }
            })
            
        
        }

};  