import { createClient } from "redis";

const client=createClient();


async function main(){
    await client.connect()
    while(1){
        const response=await client.brPop("submissions",0);
        console.log(response);

        //actually run the users code -docker exec

        await new Promise((resolve)=>setTimeout(resolve,1000));//simulate an expensive operation 
        //send it to the pub-sub

        console.log("Processed users submission")

    }
}
main()





