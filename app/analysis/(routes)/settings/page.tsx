import axios, { AxiosResponse } from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Headsheets, columns } from "@/app/scheduling/_components/settings/hs-columns"
import { DataTable } from "@/app/scheduling/_components/settings/data-table"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getHeadsheets(): Promise<Headsheets[]> {
    const headsheetsUrl = `${baseUrl}headsheets`;
    try {
      const response: AxiosResponse<Headsheets[]> = await axios.get<Headsheets[]>(headsheetsUrl);
      return response.data;
    } catch (error) {
      // Handle errors here (e.g., log the error or throw a custom error)
      console.error('Error fetching data:', error);
      throw error;
    }
  }

const Settings = async () => {
    const hsData = await getHeadsheets();

    return ( 
        <>
        <Tabs defaultValue="home" className=" w-[98%] mx-auto mt-1">
            <TabsList className=" w-full"> {/* items-center justify-center */}
                <TabsTrigger value="home">Settings</TabsTrigger>
                <TabsTrigger value="headsheets">Headsheets</TabsTrigger>
                <TabsTrigger value="ditchriders">Ditchriders</TabsTrigger>
                
            </TabsList>
            <TabsContent value="home">
              <h1 className='pt-8 font-semibold text-2xl w-2/3 mx-auto'>This is the settings home where the watermaster will set and update certain features for the scheduling and delivery processes.</h1>
            </TabsContent>
            <TabsContent value="headsheets">
                <div className='mb-5'>
                <DataTable columns={columns} data={hsData} />
                </div>
            </TabsContent>
            <TabsContent value="ditchriders">Change your ditchriders here.</TabsContent>
        </Tabs>

        </>
     );
}
 
export default Settings;


