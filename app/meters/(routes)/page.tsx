"use client"
import { useEffect, useState } from 'react';
import LakeForcast from "@/components/cards/LakeForcast";
import { cn } from '@/lib/utils';

interface Item {
  id: string;
  value: string;
  name: string;
  maxflow: string;
  color: string;
  // Add other properties as needed
}

interface TextData {
  id: string;
  description: string;
  string: string;
}

export default function Meters() {
  const [items, setItems] = useState<Item[]>([]);
  const [text, setText] = useState<TextData[]>([]);
  const [modalText, setModalText] = useState('');
  const [carsonData, setCarsonData] = useState<string | null>(null);
  const [tarzanData, setTarzanData] = useState<string | null>(null);
  const [inflowData, setInflowData] = useState<string | null>(null);
  const [levelData, setLevelData] = useState<string | null>(null);
  
  const wmInfo = text.find(item => item.id === "wminfo")
  
  useEffect(() => {
    // Load items from data.json
    async function loadItems() {
      const response = await fetch('/data.json');
      const data = await response.json();
      setItems(data.items);
      setText(data.text);
    }

    // Load data from data.json
    async function refreshData() {
      const response = await fetch('/flowsData.json');
      const newData = await response.json();
      const textData = newData.text.find((d: { id: any; }) => d.id === "tcidwarning");
      setModalText(textData ? textData.string : '');

      setItems(prevItems => {
        return prevItems.map(item => {
          const newItemData = newData.items.find((d: { id: any; }) => d.id === item.id);
          if (newItemData) {
            return { ...item, value: newItemData.value };
          }
          return item;
        });
      });
    }

    
    // Fetch and update live data
    async function updateLiveData() {
      

      const now = new Date();
      const pad = (n: number, s = 2) => `${new Array(s).fill(0)}${n}`.slice(-s);
      const endDate = `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const endTime = `${pad(now.getHours())}:${pad(now.getMinutes())}`;
  
      // Initialize start date and time to some default values
      const startDate = `${pad(now.getFullYear(), 4)}-${pad(now.getMonth() + 1)}-${pad(now.getDate() - 1)}`; // Example: one day ago
      const startTime = `${pad(now.getHours() - 4)}:${pad(now.getMinutes())}`; // Example: 4 hours ago
  
      // Update state
      
      const carsonResponse = await fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=10312150&parameterCd=00060&startDT=${startDate}T${startTime}-07:00&endDT=${endDate}T${endTime}-07:00&siteStatus=all&format=rdb`);
      const carsonData = await carsonResponse.text();
      setCarsonData(parseCarsonData(carsonData));
      

      // const tarzanResponse = await fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=10312275&parameterCd=00060&startDT=${startDate}T${startTime}-07:00&endDT=${endDate}T${endTime}-07:00&siteStatus=all&format=rdb`);
      // const tarzanData = await tarzanResponse.text();
      // setTarzanData(parseTarzanData(tarzanData));

      // const inflowResponse = await fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=10312000&parameterCd=00060&startDT=${startDate}T${startTime}-07:00&endDT=${endDate}T${endTime}-07:00&siteStatus=all&format=rdb`);
      // const inflowData = await inflowResponse.text();
      // setInflowData(parseInflowData(inflowData));

      const levelResponse = await fetch(`https://waterservices.usgs.gov/nwis/iv/?sites=10312100&parameterCd=00054&startDT=${startDate}T${startTime}-07:00&endDT=${endDate}T${endTime}-07:00&siteStatus=all&format=rdb`);
      const levelData = await levelResponse.text();
      setLevelData(parseLevelData(levelData));
    }

    // Parse the data
    function parseCarsonData(data: string): string {
      const last10 = data.slice(-10);  // Get the last 10 characters
      const cleaned = last10.replace(/\s/g, '');  // Remove all whitespace
      const num = cleaned.replace(/[a-z]/gi, '');  // Remove all alphabetic characters
      console.log(`%c\nRiver Below Lahontan => ${num}`, 'color: grey; font-size: 16px; font-weight: bold;');
      return num;
    }
  
    function parseTarzanData(data: string): string {
      const last10 = data.slice(-10);  // Get the last 10 characters
      const cleaned = last10.replace(/\s/g, '');  // Remove all whitespace
      const num = cleaned.replace(/[a-z]/gi, '');  // Remove all alphabetic characters
      console.log(`%c\nRiver at Tarzan => ${num}`, 'color: grey; font-size: 16px; font-weight: bold;');
      return num;
    }
  
    function parseInflowData(data: string): string {
      const last10 = data.slice(-10);  // Get the last 10 characters
      const cleaned = last10.replace(/\s/g, '');  // Remove all whitespace
      const num = cleaned.replace(/[a-z]/gi, '');  // Remove all alphabetic characters
      console.log(`%c\nLahontan Inflow => ${num}`, 'color: grey; font-size: 16px; font-weight: bold;');
      return num;
    }
  
    function parseLevelData(data: string): string {
      const last10 = data.slice(-10);  // Get the last 10 characters
      const cleaned = last10.replace(/\s/g, '');  // Remove all whitespace
      const num = cleaned.replace(/[a-z]/gi, '');  // Remove all alphabetic characters
      console.log(`%c\nLake Level => ${num}`, 'color: grey; font-size: 16px; font-weight: bold;');
      return num;
    }

    

    // Call loadItems on component mount
    
    loadItems();
    updateLiveData();
   
    // Set up intervals for refreshing data
    const intervalId = setInterval(() => {
      console.log('Updating Data')
      loadItems();
      // refreshData();
      updateLiveData();
    }, 600000); // Refresh every 10 minutes
    
    // Clean up interval on component unmount
    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="p-2">
      <h1 className={"text-2xl font-semibold text-yellow-800 md:text-center mb-2"}>
        System Overview
      </h1>
      <LakeForcast className='mx-2' />
      <div className='w-full p-2 my-2'>
        <div id="container" className=' w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {/* Render items */}
          {items.map((item, index) => (
            <div key={index} className={cn(`p-4 bg-slate-300 dark:bg-stone-400 shadow-md border-[3px] border-slate-600 dark:border-gray-500 rounded-lg ${item.id} flex flex-col text-center items-center`, 
            item.id === "carsonriver" 
            || item.id === "lahontaninflow" 
            || item.id === "lahontonlevel" 
            ? "col-span-3 md:mx-16 lg:mx-32" : "col-span-1")}>
            <h3 className="text-lg font-semibold" style={{ color: item.color }}>
              {item.name}
            </h3>
            <p className="font-extrabold text-black">
              <data id={item.id}>
                {item.id === "carsonriver" 
                  ? carsonData 
                  : item.id === "lahontonlevel" 
                  ? levelData
                  : item.value} {item.id === "lahontonlevel" ? "AF" : "CFS"}
                </data> 
              
            </p>
            <p>
            {item.id}
            </p>
            </div>
            
          ))}
        </div>

        {/* Modal for displaying messages */}
        {/* <div id="modal">
          <p>{modalText}</p>
        </div> */}

        
      </div>
      {/* Footer */}
      <footer className={'w-full flex flex-col items-center justify-center my-5 gap-2'}>
          <pre>{wmInfo?.string}</pre>
          <h1>© Mike Lambson 2023</h1>
          {/* Add more footer content here */}
        </footer>
    </div>
  );
}
