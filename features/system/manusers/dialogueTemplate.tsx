//Template to build a wrapped dialogue for use within another component.

// function SomeDialog({ children }: { children: React.ReactNode }) {
//   return <Dialog>
//     {children}
//     <SomeDialog.Content /> // <-- Place dialog content out of the dropdown
//   </Dialog>;
// }
// SomeDialog.Trigger = DialogTrigger;
// SomeDialog.Content = () => {
//   return (
//     <DialogContent>
//       You Content
//     </DialogContent>
//   );
// };

// <SomeDialog> // <-- Dialog root
//   <DropdownMenu>
//     <DropdownMenuTrigger>Dropdown Menu</DropdownMenuTrigger>
//     <DropdownMenuContent>
      
//         <SomeDialog.Trigger asChild>
//           <DropdownMenuItem> // <--  no need e.preventDefault()
//             Test
//           </DropdownMenuItem>
//         </SomeDialog.Trigger>
//       </Dialog>
//     </DropdownMenuContent>
//   </DropdownMenu>
// </SomeDialog>