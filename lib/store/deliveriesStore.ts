import { create } from 'zustand';
import { scheduleFetcher } from '@/lib/scheduleClass';
import { HeadData, HeadsheetsData, PartialHeadsheetsData, SchBoard, TypedScheduled } from '@/typings';

type Delivery = {
    id: string;
    status: string;
    // other delivery properties...
};

type DeliveriesState = {
    deliveries: Delivery[];
    isLoading: boolean;
    error: string | null;


    selectedDistrict: string;
    headsheets: HeadsheetsData[];
    selectedSheet: PartialHeadsheetsData;
    selectedHead: HeadData;
    schedule: SchBoard;
    getHeadsheets: (district: string) => Promise<void>; 
    setSelectedSheet: (sheet: HeadsheetsData) => void;
    setSelectedHead: (head: number) => void;
    setSelectedDistrict: (district: string) => void;
    getSchedule: (head: number) => Promise<void>;

    fetchDeliveries: () => Promise<void>;
    updateDeliveryStatus: (id: string, status: string) => void;
};

const fetchSchedule = new scheduleFetcher();

const useDeliveriesStore = create<DeliveriesState>((set) => ({
    deliveries: [],
    isLoading: false,
    error: null,

    selectedDistrict: "",
    headsheets: [],
    selectedSheet: {
        id: 0,
        name: "Select",
        district: "",
        maxHeads: 0,
        maxFlow: 0,
        structureRef: "",
        characteristics: "",
    },
    selectedHead: "Select",
    schedule: {
        setDistrict: () => {},
        setSelectedSheet: () => {},
        setSelectedHead: () => {},
        columns: new Map<number, TypedScheduled>(),
    },
    getHeadsheets: async (district) => {
        try {
            const response = await fetch(`/api/headsheets/${district}`);
            const newSheets = await response.json();
            set({ headsheets: newSheets });
            set({
                selectedSheet: {
                    id: 0,
                    name: "Select",
                    district: "",
                    maxHeads: 0,
                    maxFlow: 0,
                    structureRef: "",
                    characteristics: "",
                },
            });
        } catch (error) {
            console.error('Error fetching headsheets:', error);
        }
    },
    setSelectedSheet: (headsheet) => set({ selectedSheet: headsheet }),
    setSelectedHead: (head) => set({ selectedHead: head }),
    setSelectedDistrict: (district) => set({ selectedDistrict: district }),
    getSchedule: async (head) => {
        const { selectedDistrict, selectedSheet } = useDeliveriesStore.getState();
        const filters = {
            district: selectedDistrict,
            headsheet: selectedSheet,
            head: head,
        };
        const scheduledOrders: SchBoard = (await fetchSchedule.fetchScheduledOrders(filters)) ?? {
            setDistrict: () => {},
            setSelectedSheet: () => {},
            setSelectedHead: () => {},
            columns: new Map<number, TypedScheduled>(),
        };
        set({ schedule: scheduledOrders });
    },





    fetchDeliveries: async () => {
        set({ isLoading: true, error: null });
        try {
            // Fetch deliveries from API
            const response = await fetch('/api/deliveries');
            const data = await response.json();
            set({ deliveries: data, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch deliveries', isLoading: false });
        }
    },
    updateDeliveryStatus: (id, status) => {
        set((state) => ({
            deliveries: state.deliveries.map((delivery) =>
                delivery.id === id ? { ...delivery, status } : delivery
            ),
        }));
    },
}));

export default useDeliveriesStore;