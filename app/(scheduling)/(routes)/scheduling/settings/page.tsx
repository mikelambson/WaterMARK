import axios, { AxiosResponse } from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Headsheets, columns } from "@/app/(scheduling)/_components/settings/hs-columns"
import { DataTable } from "@/app/(scheduling)/_components/settings/data-table"

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
        <Tabs defaultValue="headsheets" className=" w-[98%] mx-auto mt-1">
            <TabsList className=" w-full">
                <h1 className=" absolute left-24">Settings</h1>
                <TabsTrigger value="headsheets">Headsheets</TabsTrigger>
                <TabsTrigger value="ditchriders">Ditchriders</TabsTrigger>
            </TabsList>
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


