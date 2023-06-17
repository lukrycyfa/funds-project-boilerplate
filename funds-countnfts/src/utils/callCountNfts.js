import axios from "axios";
import Address from '../artifacts/Address.json';
import CountNfts from '../artifacts/CountNfts.json';


export const uploadImg = async (url, fileName ) =>{

    const getExt = (fileName) =>{
        return fileName.slice(fileName.indexOf(".")+1, fileName.lenght);
    } 
    const formData = new FormData();
    await fetch(url)
    .then(async response => { 
        const ext = getExt(fileName);
        const blob = await response.blob()
        const nfile = new File([blob], fileName, { type:`image/${ext}` })
        // console.log(nfile);
        formData.append("file", nfile);        
    })
    try {
        // Configure Request To Post Data To Pinata
        const res = await axios.post(
            "https://api.pinata.cloud/pinning/pinFileToIPFS",
            formData,
            {
            maxBodyLength: "Infinity",
            headers: {
                "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
                pinata_api_key: process.env.REACT_APP_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_SECRET_API_KEY
            },
            }
        );
    
        // console.log(res.data.IpfsHash)
        return `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    } catch (error) {
        console.log(error);
    } 

}

// to avoid an invalid account error while sending transactions we have to recreate an instance of our contract from the Minikit Method in perfomactions
// to get an signed abstaction of the connected account and deployed contract.
export const Minttoken = async (imgUrl, performActions) =>{
    if (!imgUrl) return;
    try{
        await performActions( async (k) =>{
            const countNfs = await new k.connection.web3.eth.Contract(CountNfts.abi, Address.address);
                                                                                                          
            const txn = await countNfs.methods.safeMint(imgUrl).send({from:k.connection.defaultAccount});
            console.log(txn); 
        })
        
    } catch (error){
        console.log(error);
    }
}



// export const GetMetaFromIPFS = async (ipfsUrl) =>{
//     try{
//         if (!ipfsUrl) return null;
//         //Ipfs Request
//         var config = {
//           method: "get",
//           url: ipfsUrl,
//           headers: {
//             Authorization: process.env.REACT_APP_JWT,
//           },
//         };
//         const meta = await axios(config);
//         return meta;
//     } catch (error){
//         console.log(error);
//     }
// }


export const Subcount =  async ( performActions ) =>{
    try{
        await performActions( async (k) =>{
            const countNfts = await new k.connection.web3.eth.Contract(CountNfts.abi, Address.address);
            const _verify = await countNfts.methods.SubCount().send({from:k.connection.defaultAccount});
            console.log(_verify)
        })
        
    } catch (error){
        console.log(error);
    }

}

export const Addcount =  async ( performActions ) =>{
    try{
        await performActions( async (k) =>{
            const countNfts = await new k.connection.web3.eth.Contract(CountNfts.abi, Address.address);
            const _verify = await countNfts.methods.AddCount().send({from:k.connection.defaultAccount});
            console.log(_verify);
        })
        
    } catch (error){
        console.log(error);
    }

}

export const Getcount =  async (countNfts) =>{
    try{
        const _count = await countNfts.methods.GetCount().call();
        console.log(_count)
        return _count;
    } catch (error){
        console.log(error);
    }
}
 