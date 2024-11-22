import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const AboutPage = () => {
    return (
        <div className="p-2">
            <h1 className={"p-2 text-2xl font-semibold text-yellow-800 text-center "}>
                About WaterMARK
            </h1>
            <p className="ml-4 md:text-lg md:mx-14">
                WaterMARK is a Water Measurement Administration & Record Keeping system designed to provide access to critical information in water delivery and management, maintain accuracy in records, and facilitate transparency in operations to the users.
            </p>
            <div className="mt-8 flex w-11/12 md:w-5/6 mx-auto justify-center items-center">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className={"text-xl font-semibold text-yellow-800 md:text-center "}>
                        History
                    </AccordionTrigger>
                    <AccordionContent>
                        WaterMARK was imagined by the developer as a means to solve real and percieved problems in the surface water delivery methods as well as other inefficiencies due to the delay of information and miscommunication.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className={"text-xl font-semibold text-yellow-800 md:text-center "}>
                        Mission
                    </AccordionTrigger>
                    <AccordionContent>
                        Our mission is to provide delivery of water to the community in an efficient way, while mitigating losses especially during drought years.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className={"text-xl font-semibold text-yellow-800 md:text-center "}>
                        Vision
                    </AccordionTrigger>
                    <AccordionContent>
                        Our vision is to provide...
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className={"text-xl font-semibold text-yellow-800 md:text-center "}>
                        Values
                    </AccordionTrigger>
                    <AccordionContent>
                        Our values are to provide the best water solutions to our userss, to provide the best customer service, and to provide the best water solutions to our users.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            </div>

        </div>
    );
};

export default AboutPage;