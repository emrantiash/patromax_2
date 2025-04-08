export default  increament = (value)=>{
    if(parseInt(value) >= 1){
        setValue(parseInt(value)+1)
        setData({
            ...data,
            price : parseInt(basePrice) * (parseInt(value)+1),
            basePrice : basePrice,
            quantity : parseInt(value)+1
        })
    }    
  }