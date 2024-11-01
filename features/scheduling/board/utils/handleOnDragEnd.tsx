// handleOnDragEnd.ts
import { toast } from "@/components/ui/use-toast";
import { calculateNewScheduleTimestamp } from "@/lib/utils";
import ApiFetch from "@/lib/apiFetch";
import { HeadsheetsData, Board, PartialHeadsheetsData, HeadData, TypedScheduled, SchBoard, TypedUnscheduled, ColumnUnscheduled, ColumnScheduled} from '@/typings';

interface SchedulingState {
    board: Board;
    updateOrderStatus: (orderId: string, newStatus: string) => void;
    isLoading: boolean;
    selectedDistrict: string;
    page: number;
    pageSize: number;
    totalPages: number;
    headsheets: HeadsheetsData[];
    selectedSheet: PartialHeadsheetsData;
    selectedHead: HeadData;
    schedule: SchBoard;
    setDistrict: (district: string) => void;
    getHeadsheets: (district: string) => Promise<void>; 
    setSelectedSheet: (sheet: HeadsheetsData) => void;
    setSelectedHead: (head: number) => void;
    setSelectedDistrict: (district: string) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
    getBoard: (state: SchedulingState) => Promise<void>; // Receive state as a parameter
    getSchedule: (head: number) => Promise<void>;
    getUnscheduled: (district: string, page: number, pageSize: number) => Promise<void>;
    
}

// Define `handleOnDragEnd` as a function with parameters for dependencies
export const handleOnDragEnd = async (
    result: any,
    schedulingState: SchedulingState,
    apiFetch: ApiFetch,
    setDialogOpen: (isOpen: boolean) => void
) => {
    const { board, getBoard, getSchedule, selectedSheet, selectedHead, schedule } = schedulingState;
    let draggedScheduleTime: any;   
    // Destructure the result object to get the source and destination
    const { 
        destination: draggedDestination, 
        source, 
        draggableId: draggableOrderId 
    } = result;
    const { 
        index: destinationColumnIndex, 
        droppableId: destinationColumnId 
    } = draggedDestination;
    const { droppableId: sourceId } = source;
    const {  } = source;
    
    // Check if previousOrder exists
    const draggedOrder = Array.from(board.columns?.values() || []).flatMap(column => column.orders).find(order => order.id === draggableOrderId);
    // console.log(draggedOrder);

    const scheduledColumn = Array.from(schedule.columns).map(([key, value]) => ({ [key]: value }));
    const headID = Number(selectedHead) - 1;
    const previousOrder = scheduledColumn[headID][Number(selectedHead)].schedules[destinationColumnIndex - 1];
    const isolatedScheduledColumn = scheduledColumn[headID][Number(selectedHead)].schedules;
    const draggedSubsequentOrders = isolatedScheduledColumn.slice(destinationColumnIndex);

    const calculateNewScheduleTime = (previousOrder: any) => {
        if (!previousOrder) {
            setDialogOpen(true)
            return new Date().toISOString();
        }
        const scheduledDate = new Date(previousOrder.scheduledDate);
        const approxHrsMs = previousOrder.order.approxHrs * 3600000;
        const newTimeMs = scheduledDate.getTime() + approxHrsMs;
        const newISOTime = new Date(newTimeMs).toISOString();
        return newISOTime;   
    };

    if (sourceId === '0' && destinationColumnId === '0') {
        toast({
            variant: "destructive",
            title: 'Invalid Destination',
            description: 'Cannot move unscheduled orders to the same column yet',
        });
        return;    
    }
    if (sourceId === '0' && destinationColumnId === '1') {
        draggedScheduleTime = calculateNewScheduleTime(previousOrder);
        const lineId = Number(selectedSheet.id);

        // Initialize update list with the dragged order's new schedule
        const updateList = [
            {
                orderId: draggableOrderId,
                scheduledLineId: lineId,
                scheduledHead: Number(selectedHead),
                scheduledDate: draggedScheduleTime,
                order: {
                    status: 'scheduled',
                },
                travelTime: 0,
            },            
            ...draggedSubsequentOrders.map((order) => ({
                orderId: order.orderId,
                scheduledDate: calculateNewScheduleTimestamp(order.scheduledDate, draggedOrder?.approxHrs || 0),
            }))
        ];

    console.log('Dragged\n\nUpdate Data:', updateList);

        for (const scheduleData of updateList) {
            const { orderId, ...requestData } = scheduleData;
            console.log('Request Data:', requestData);
            try {
                const response = await apiFetch.updateData(`schedule/${orderId}`, requestData);
                console.log('Response:', response);
            } catch (error) {
                console.error('Error Updating Schedule:', error);
            }
        }

        getBoard(schedulingState);
        getSchedule(Number(selectedHead));

        toast({
            variant: "top_right",
            title: 'Order Scheduled',
            description: `Order ${draggedOrder?.orderNumber} has been successfully scheduled to ${selectedSheet.name} Head ${selectedHead} at ${new Date(draggedScheduleTime).toLocaleString()}.`,
        });
    
    // Handle other drag and drop logic as needed
    // ...
    };
 if (sourceId === '1' && destinationColumnId === '1') {
     // Reorder the items in the column
     const headID = Number(selectedHead);
     if (!headID) {
        console.error('Error: headID is undefined.')
        console.error(headID)
        return
     }
     let isolatedScheduledColumn;

     if (headID) {isolatedScheduledColumn = schedule.columns.get(headID)?.schedules;}

     if (!isolatedScheduledColumn) {
        console.error('Error: isolatedScheduledColumn is undefined.');
        return;
    }
 
    // Locate and extract the dragged order
    const draggedOrderIndex = isolatedScheduledColumn.findIndex(order => order.orderId === draggableOrderId);
    
    // Ensure draggedOrderIndex is valid
    if (draggedOrderIndex === -1) {
        console.error('Error: dragged order not found in isolatedScheduledColumn.');
        return;
    }

    const draggedOrder = isolatedScheduledColumn[draggedOrderIndex];
 
     // Create the reordered column list
     const reorderedColumn = [
         ...isolatedScheduledColumn.slice(0, draggedOrderIndex),
         ...isolatedScheduledColumn.slice(draggedOrderIndex + 1),
     ];
     reorderedColumn.splice(destinationColumnIndex, 0, draggedOrder);
 
     // Update the board state with the reordered column
     const updatedSchedule = new Map(schedule.columns);
     const updatedBoardColumns: Map<string, TypedUnscheduled> = new Map(
        Array.from(updatedSchedule).map(([key, value]) => [String(key), value as unknown as TypedUnscheduled])
    );
     // Update the board state with the transformed column map
    schedulingState.board = { ...board, columns: updatedBoardColumns };
 
     // Step 1: Insert the dragged order at its new position in reorderedColumn
    const updateList = reorderedColumn.map((order, index) => {
        // Calculate the new start time based on the previous order’s end time
        if (index === 0) {
            // First order in the list, set its start time as is (or a base time)
            order.scheduledDate = calculateNewScheduleTimestamp(order.scheduledDate, 0);
        } else {
            // For each subsequent order, calculate start time based on the previous order's end time
            const previousOrder = reorderedColumn[index - 1];
            const previousOrderDuration = previousOrder.order.approxHrs + previousOrder.travelTime;
            const previousEndTime = calculateNewScheduleTimestamp(
                previousOrder.scheduledDate,
                previousOrderDuration
            );
            
            // Set the start time for the current order
            order.scheduledDate = previousEndTime;
        }

        return {
            orderId: order.orderId,
            scheduledLineId: Number(selectedSheet.id),
            scheduledHead: Number(selectedHead),
            scheduledDate: order.scheduledDate,
            order: {
                status: 'scheduled',
            },
            travelTime: order.travelTime || 0,
        };
    });
    // Update each schedule through the API
    for (const scheduleData of updateList) {
        const { orderId, ...requestData } = scheduleData;
        console.log('Request Data:', requestData);
        try {
            const response = await apiFetch.updateData(`schedule/${orderId}`, requestData);
            console.log('Response:', response);
        } catch (error) {
            console.error('Error Updating Schedule:', error);
        }
    }
 
    // Refresh board and schedule state
    getBoard(schedulingState);
    getSchedule(Number(selectedHead));
    }

    if (sourceId === '1' && destinationColumnId === '0') {
        
    // setDialogOpen(true) 
    // Step 1: Isolate the scheduled column and dragged order
    const headID = Number(selectedHead);
    if (!headID) {
        console.error('Error: headID is undefined.');
        return;
    }

    const isolatedScheduledColumn = schedule.columns.get(headID)?.schedules;
    if (!isolatedScheduledColumn) {
        console.error('Error: isolatedScheduledColumn is undefined.');
        return;
    }

    // Locate the dragged order in the column
    const draggedOrderIndex = isolatedScheduledColumn.findIndex(order => order.orderId === draggableOrderId);
    if (draggedOrderIndex === -1) {
        console.error('Error: dragged order not found in isolatedScheduledColumn.');
        return;
    }

    const draggedOrder = isolatedScheduledColumn[draggedOrderIndex];
    try {
        await apiFetch.updateData(`schedule/${draggedOrder.orderId}`, {
            orderId: draggedOrder.orderId,
            scheduledLineId: null,
            scheduledHead: null,
            scheduledDate: null,
            order: {
                status: 'delayed',
            },
            travelTime: 0,
        });
        console.log(`Order ${draggedOrder.orderId} marked as delayed.`);
    } catch (error) {
        console.error(`Error updating status to delayed for order ${draggedOrder.orderId}:`, error);
    }

    // Step 3: Adjust subsequent orders by subtracting the delayed order's duration
    const delayedOrderDuration = draggedOrder.order.approxHrs || 0;
    const subsequentOrders = isolatedScheduledColumn.slice(draggedOrderIndex + 1);

    for (const order of subsequentOrders) {
        // Adjust each order’s start time by subtracting the delayed order's duration
        order.scheduledDate = calculateNewScheduleTimestamp(order.scheduledDate, -delayedOrderDuration);

        try {
            await apiFetch.updateData(`schedule/${order.orderId}`, {
                scheduledDate: order.scheduledDate,
                travelTime: order.travelTime || 0,
            });
            console.log(`Order ${order.orderId} rescheduled after delay adjustment.`);
        } catch (error) {
            console.error(`Error updating subsequent order ${order.orderId}:`, error);
        }
    }
        getBoard(schedulingState);
        getSchedule(Number(selectedHead));
    } else { null }
    
}