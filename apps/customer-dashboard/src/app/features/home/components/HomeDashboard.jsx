// import {
//   Button,
//   Dialog,
//   Input,
//   Modal,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalTitle,
//   Select,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectSeparator,
//   Switch,
//   SwitchWithLabel,
//   Textarea,
//   useModal,
// } from '@brizpickr/ui-kit';

// import React, { useState } from 'react';
// import { useProducts } from '@brizpickr/api-client';
// import { Bell, UserCheck2Icon, UserCircle2 } from 'lucide-react';
// // import  CircleUser  from 'lucide-react';

// const HomeDashboard = () => {
//   const page = 1;
//   const limit = 3;
//   const { data, isLoading,isFetching, error } = useProducts(page,limit);
//   console.log('use[FDF', data);

//   const { isOpen, open, close } = useModal();
//   const [formData, setFormData] = useState({
//     isNewCustomer: false,
//     subject: '',
//     paymentType: '',
//     orderType: '',
//   });
//   const [order, setOrder] = useState('');
//   const [value, setValue] = useState('');
//   const [itemName, setItemName] = useState('');
//   const [orderData, setOrderData] = useState('');
//   const [checked, setChecked] = useState(false);
//   const [visibleCount, setVisibleCount] = useState(3);

//   // const handleShowMore = () => {
//   //   setVisibleCount(prev => prev + 3);
//   // };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   return (
//     <div className="min-h-screen bg-gray-50 ">
//       {/* Hero Section */}
//       <section className="bg-white py-10 px-6 text-center">
//         <div className="mx-auto flex justify-between items-center">
//           <div className="border p-5 rounded-3xl">
//             <h1 className="text-4xl font-bold mb-4 text-blue-500">
//               Good Morning, Alex!
//             </h1>
//             <p className="text-lg text-gray-600">
//               Here is an overview of your activities!
//             </p>
//           </div>

//           <Button
//             className={'bg-stone-700 text-secondary-50 hover:bg-stone-950'}
//             onClick={() => open(true)}
//           >
//             + New Requirement
//           </Button>
//         </div>

//         <Modal isOpen={isOpen} onClose={close} size="xl">
//           <ModalHeader>
//             <ModalTitle>Create New Order</ModalTitle>
//           </ModalHeader>
//           <ModalContent>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
//               {/* Left Section */}
//               <div>
//                 <div className="mb-4 flex justify-between items-start">
//                   <h1 className=" text-gray-800 mb-2">Order Details</h1>
//                   <div className="flex justify-center item-center gap-5">
//                     <h1 className=" text-gray-800 mb-2">New customer</h1>

//                     <Switch
//                       className={' bg-orange-800'}
//                       checked={checked}
//                       onCheckedChange={setChecked}
//                       disabled={false}
//                     />
//                   </div>
//                 </div>

//                 <div className="mb-4">
//                   <Select
//                     value={formData.subject}
//                     onValueChange={value =>
//                       setFormData({ ...formData, subject: value })
//                     }
//                   >
//                     <SelectItem className="bg-slate-100" value="general">
//                       General Inquiry
//                     </SelectItem>
//                     <SelectItem className="bg-slate-100" value="support">
//                       Technical Support
//                     </SelectItem>
//                   </Select>
//                 </div>

//                 <div className="w-full flex justify-between gap-4 mb-4">
//                   <Select
//                     value={value}
//                     onValueChange={setValue}
//                     placeholder="Select Order Type"
//                     className="w-44"
//                   >
//                     <SelectItem className="bg-slate-100" value="online">
//                       Online
//                     </SelectItem>
//                     <SelectItem className="bg-slate-100" value="ofLine">
//                       Ofline
//                     </SelectItem>
//                   </Select>
//                   <Select
//                     value={order}
//                     onValueChange={setOrder}
//                     placeholder="Select Payment Type"
//                     className="w-44"
//                   >
//                     <SelectItem className="bg-slate-100" value="online">
//                       Online
//                     </SelectItem>
//                     <SelectItem className="bg-slate-100" value="cash">
//                       Cash
//                     </SelectItem>
//                   </Select>
//                 </div>

//                 {/* Time/Date */}
//                 <div className="mb-1">
//                   <h3 className="text-sm mb-1 text-left">Order Time & Date</h3>
//                   <div className="h-10 bg-gray-100 rounded-md" />
//                 </div>

//                 <div>
//                   <h1 className="text-left text-sm">Order Status</h1>

//                   <Select
//                     value={orderData.subject}
//                     onValueChange={value =>
//                       setOrderData({ ...formData, subject: value })
//                     }
//                   >
//                     <SelectItem className="bg-slate-100" value="general">
//                       General Inquiry
//                     </SelectItem>
//                     <SelectItem className="bg-slate-100" value="support">
//                       Technical Support
//                     </SelectItem>
//                     <SelectItem className="bg-slate-100" value="billing">
//                       Billing Question
//                     </SelectItem>
//                   </Select>
//                 </div>

//                 <div>
//                   <Textarea
//                     placeholder="Order note"
//                     value={formData.message}
//                     onChange={e =>
//                       setFormData({ ...formData, message: e.target.value })
//                     }
//                     rows={4}
//                     required
//                     className="my-4"
//                   />
//                 </div>
//               </div>

//               {/* Right Section */}
//               <div className="text-left ml-2 sm:ml-8 max-w-md">
//                 <h1 className="mb-5">Item</h1>
//                 <Input
//                   placeholder="Enter item name"
//                   value={itemName}
//                   onChange={e => setItemName(e.target.value)}
//                 />
//               </div>
//             </div>
//           </ModalContent>

//           <ModalFooter>
//             <Button
//               variant="outline"
//               onClick={close}
//               className="bg-red-400 hover:bg-red-700"
//             >
//               Cancel
//             </Button>
//             <Button
//               className="bg-blue-500 hover:bg-blue-600"
//               type="submit"
//               onClick={() => alert('Submitted!')}
//             >
//               Submit
//             </Button>
//           </ModalFooter>
//         </Modal>
//       </section>

//       <div className="max-w-xl mx-auto p-4 border rounded-xl ml-4">
//         <h1 className="text-2xl font-bold mb-4">Message</h1>
//         <ul className="flex flex-col gap-0">
//           {data.products &&
//             data.products.slice(0, visibleCount).map(product => (
//               <li
//                 key={product.id}
//                 className="ml-10 flex items-center gap-3 text-start border border-transparent hover:border-gray-500 rounded-lg p-2 "
//               >
//                 <UserCircle2 size={27} className=" text-blue-600" />
//                 <div>
//                   <h2 className="text-lg font-semibold">{product.title}</h2>
//                 <p className="text-gray-700">${product.warrantyInformation}</p>
//                 </div>
//               </li>
//             ))}
//         </ul>

//         {data?.products?.length > 0 && (
//           <div className="mt-6 text-center">
//             <button
//               onClick={() => setPage(prev => prev + 1)}
//               disabled={isFetching}
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               {isFetching ? 'Loading...' : 'Show More'}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomeDashboard;

import React, { useState } from 'react';
import {
  Button,
  Dialog,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  SelectItem,
  Switch,
  Textarea,
  useModal,
} from '@brizpickr/ui-kit';

import { useProducts } from '@brizpickr/api-client';
import { UserCircle2 } from 'lucide-react';

const HomeDashboard = () => {
  const [page, setPage] = useState(1);
  const limit = 3;
  const { data, isLoading, isFetching, error } = useProducts(page, limit);
  console.log('useProducts data:', data);

  const { isOpen, open, close } = useModal();
  const [formData, setFormData] = useState({
    isNewCustomer: false,
    subject: '',
    paymentType: '',
    orderType: '',
    message: '',
  });
  const [order, setOrder] = useState('');
  const [value, setValue] = useState('');
  const [itemName, setItemName] = useState('');
  const [orderData, setOrderData] = useState({ subject: '' });
  const [checked, setChecked] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-10 px-6 text-center">
        <div className="mx-auto flex justify-between items-center">
          <div className="border p-5 rounded-3xl">
            <h1 className="text-4xl font-bold mb-4 text-blue-500">
              Good Morning, Alex!
            </h1>
            <p className="text-lg text-gray-600">
              Here is an overview of your activities!
            </p>
          </div>

          <Button
            className="bg-stone-700 text-secondary-50 hover:bg-stone-950"
            onClick={() => open(true)}
          >
            + New Requirement
          </Button>
        </div>

        <Modal isOpen={isOpen} onClose={close} size="xl">
          <ModalHeader>
            <ModalTitle>Create New Order</ModalTitle>
          </ModalHeader>
          <ModalContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
              {/* Left Section */}
              <div>
                <div className="mb-4 flex justify-between items-center">
                  <h1 className="text-gray-800 mb-2">Order Details</h1>
                  <div className="flex justify-center items-center gap-5">
                    <h1 className="text-gray-800 mb-2">New customer</h1>

                    <Switch
                      className="bg-orange-800"
                      checked={checked}
                      onCheckedChange={setChecked}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Select
                    value={formData.subject}
                    onValueChange={value =>
                      setFormData({ ...formData, subject: value })
                    }
                    placeholder="Select Subject"
                  >
                    <SelectItem className="bg-slate-100" value="general">
                      General Inquiry
                    </SelectItem>
                    <SelectItem className="bg-slate-100" value="support">
                      Technical Support
                    </SelectItem>
                  </Select>
                </div>

                <div className="w-full flex justify-between gap-4 mb-4">
                  <Select
                    value={value}
                    onValueChange={setValue}
                    placeholder="Select Order Type"
                    className="w-44"
                  >
                    <SelectItem className="bg-slate-100" value="online">
                      Online
                    </SelectItem>
                    <SelectItem className="bg-slate-100" value="offline">
                      Offline
                    </SelectItem>
                  </Select>
                  <Select
                    value={order}
                    onValueChange={setOrder}
                    placeholder="Select Payment Type"
                    className="w-44"
                  >
                    <SelectItem className="bg-slate-100" value="online">
                      Online
                    </SelectItem>
                    <SelectItem className="bg-slate-100" value="cash">
                      Cash
                    </SelectItem>
                  </Select>
                </div>

                {/* Time/Date Placeholder */}
                <div className="mb-1">
                  <h3 className="text-sm mb-1 text-left">Order Time & Date</h3>
                  <div className="h-10 bg-gray-100 rounded-md" />
                </div>

                <div>
                  <h1 className="text-left text-sm">Order Status</h1>
                  <Select
                    value={orderData.subject}
                    onValueChange={value =>
                      setOrderData({ ...orderData, subject: value })
                    }
                    placeholder="Select Order Status"
                  >
                    <SelectItem className="bg-slate-100" value="general">
                      General Inquiry
                    </SelectItem>
                    <SelectItem className="bg-slate-100" value="support">
                      Technical Support
                    </SelectItem>
                    <SelectItem className="bg-slate-100" value="billing">
                      Billing Question
                    </SelectItem>
                  </Select>
                </div>

                <div>
                  <Textarea
                    placeholder="Order note"
                    value={formData.message}
                    onChange={e =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    rows={4}
                    required
                    className="my-4"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="text-left ml-2 sm:ml-8 max-w-md">
                <h1 className="mb-5">Item</h1>
                <Input
                  placeholder="Enter item name"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                />
              </div>
            </div>
          </ModalContent>

          <ModalFooter>
            <Button
              variant="outline"
              onClick={close}
              className="bg-red-400 hover:bg-red-700"
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              type="submit"
              onClick={() => alert('Submitted!')}
            >
              Submit
            </Button>
          </ModalFooter>
        </Modal>
      </section>

      <div className="max-w-xl mx-auto p-4 border rounded-xl ml-4">
        <h1 className="text-2xl font-bold mb-4">Message</h1>
        <ul className="flex flex-col gap-0">
          {data?.products &&
            data.products.slice(0, visibleCount).map(product => (
              <li
                key={product.id}
                className="ml-10 flex items-center gap-3 text-start border border-transparent hover:border-gray-500 rounded-lg p-2"
              >
                <UserCircle2 size={27} className="text-blue-600" />
                <div>
                  <h2 className="text-lg font-semibold">{product.title}</h2>
                  <p className="text-gray-700">
                    ${product.warrantyInformation}
                  </p>
                </div>
              </li>
            ))}
        </ul>

        {data?.products?.length > visibleCount && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setPage(prev => prev + 1)}
              disabled={isFetching}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {isFetching ? 'Loading...' : 'Show More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeDashboard;
