"use client";
import Schorlar from "@/components/scholar/Schorlar";
import { useGetAllScholarsQuery } from "@/redux/service/scholarApi";
export default function Scholar() {
  const {data, isLoading} = useGetAllScholarsQuery();
  if(isLoading){
    return <div>Loading...</div>
  }
  console.log(data)
  return (
    <main className="" >

     
      <Schorlar/>
     
      
    </main>
  );
}
