const txServiceContext = React.createContext(null)



function TxServiceProvider({children, userInfo}:any){ 



const txServices = {
reader: new Read(),
writer: new Write()
};
 
useEffect(()=>{
read.updateWallet(userInfo.account)
write.updateUserInfo(userInfo.account, userInfo.provider)
},[userInfo])


return (

<txServiceContext value={txServices}>
{children}
<txServiceContext/>

)


}

