import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useCelo } from "@celo/react-celo";
import { Card, Spacer, Text, Button,  Row, Grid, Avatar} from "@nextui-org/react";
import { Minttoken, uploadImg, Getcount, Addcount, Subcount } from "../../utils/callCountNfts";
import DisplayNfts from "./nfts";
import Load from "../ui/loading";
import { IconStarFourPoints } from "../icons/Icons";
import Notification from "../ui/notification";

const CountWrapper = ({countNfts, getBalance}) =>{

  const { address, performActions } = useCelo();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0)
  const [notify, setNotify] = useState(null);

  const getCount = useCallback( async () => {
    try{
      setLoading(true);
      const _count = await Getcount(countNfts);
      setCount(_count)
      console.log(_count);
    }catch(error){
      console.log(error)
    }finally{
      setLoading(false);
    }
  },[countNfts])  

  const addCount = async () =>{
    try{
        setLoading(true)
        await Addcount(performActions);
        setNotify(<Notification Text="Count Was Added Successfully" Bool={true}/>)
        await getCount();
      } catch (error) {
        console.log(error);
        setNotify(<Notification Text="Error Encountered While Adding count" Bool={false}/>)
      } finally { 
        setLoading(false)
    }
  }

  const subCount = async () =>{
    try{
        setLoading(true)
        await Subcount(performActions);
        setNotify(<Notification Text="Count Was Subtracted Successfully" Bool={true}/>)
        await getCount();
      } catch (error){
        console.log(error);
        setNotify(<Notification Text="Error Encountered While Subtracting count" Bool={false}/>)
     } finally{
        setLoading(false)
    }
  }

  const pushImg_n_Mint = async (url, filename) =>{
    try{
        setLoading(true)
        const imgUrl = await uploadImg(url, filename);
        console.log(imgUrl);
        if(!imgUrl) return;
        await Minttoken( imgUrl, performActions);
        setNotify(<Notification Text="Your Token Was Minted Successfully" Bool={true}/>)
      } catch (error){
        console.log(error);
        setNotify(<Notification Text="Error Encountered While Minting Token" Bool={false}/>)
      } finally{
        setLoading(false)
    }
  }


  useEffect( ()=>{
    try{
        setLoading(true);
        if (address && countNfts){
            getBalance();
            getCount();              
        }
    } catch (error){
      console.log(error);        
    } finally{
      setLoading(false);
    }
  },[address, countNfts, getBalance, getCount])


  if (address)
    {
      return(
        <>
            {!loading ? (
            <>
              {notify}
              <Grid.Container gap={2} justify="center" alignItems='center' alignContent='center'>
                <Grid xs>
                  <Text
                      h5
                      size={20}
                      css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                      }}
                      weight="bold">
                      Funds Project Boilerplate
                  </Text>
                </Grid>
              </Grid.Container>
              <Spacer x={1} />
              <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                <Avatar squared icon={<IconStarFourPoints />} />
                <Text h5 size={20} css={{textGradient: "45deg, $blue600 -20%, $pink600 50%"}} weight="bold">
                  Count:{"  "} {count}
                </Text>
              </div>
              <Spacer x={1} />
            </>):(
              <Load/>  
            )}

            {!loading ? (<>           
                <div style={{ display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center"}}>
                  <div>
                    <Row>
                      <Button auto ghost shadow color="secondary" onClick={()=>{ addCount()}}>
                        Add Count
                      </Button>
                      <Spacer x={1} />
                      <Button auto ghost shadow color="secondary" onClick={()=>{ subCount()}}>
                        Sub Count
                      </Button>
                    </Row>  
                  </div>                             
                </div> 
                </>):(<>
                  <Load/>
            </>)}
            
            <Spacer x={1} />       
            {!loading  ?  (<>
              <Card css={{ p: "$14"}}>
                <Card.Header>                
                    <Text
                    h2
                      size={20}
                      css={{
                        textGradient: "45deg, $blue600 -20%, $pink600 50%",
                      }}
                      weight="bold"
                    >
                      Mintable Nft's
                    </Text>
                </Card.Header>
                  <Card.Body>
                    <DisplayNfts
                    pushImg={pushImg_n_Mint}
                    />   
                  </Card.Body> 
              </Card>
              </>):(<>              
              <Load/>
            </>)}
           <Spacer x={1} />             
        </>
      );        
  }  
  return null;    
}

CountWrapper.propTypes = {
    countNfts: PropTypes.instanceOf(Object),
    getBalance: PropTypes.func.isRequired
}
export default CountWrapper;