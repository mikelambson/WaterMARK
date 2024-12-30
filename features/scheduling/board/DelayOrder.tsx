import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import ApiFetch from '@/services/apiFetch'; 

interface DelayOrderProps {
    orderId: string;
    onUpdate?: any;
    currentStatus?: string;
}

const DelayOrderButton: React.FC<DelayOrderProps> = ({ orderId, currentStatus, onUpdate }) => {
    const { toast } = useToast()
    const buttonLabel = currentStatus === "P" ? "Delay Order" : "Undelay Order"
    const handleDelayOrder = async () => {
        const newStatus =  currentStatus === "delayed" ? "P" : "delayed";
        const apiFetch = new ApiFetch();

        try {
        // Use the apiFetch class to update the order
        const response = await apiFetch.updateData(`orders/${orderId}`, {
            status: newStatus,
        });

        // If the update is successful, trigger the onUpdate callback
        if (response.success) {
            toast({
                title: `Success`,
                description: `Status changed to: ${newStatus}\n\nID: ${orderId}`,
            })
            onUpdate(orderId, newStatus)
        } else {
            // Handle error if needed
            const errorString = typeof response.error === 'string' ? response.error : JSON.stringify(response.error);
            toast({
                title: `Error updating order status: ${orderId}`,
                description: errorString,
            })
            console.error('Error updating order status:', response.error);
        }
        } catch (error) {
        // Handle unexpected errors
        console.error('Unexpected error:', error);
        }
    };

  return (
    <Button variant={"secondary"} onClick={handleDelayOrder}>
      {buttonLabel}
    </Button>
  );
};

export default DelayOrderButton;
