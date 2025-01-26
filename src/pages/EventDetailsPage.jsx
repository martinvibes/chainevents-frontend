import leftArr from "../assets/left-arrow.svg";
import locationIcon from "../assets/locationIcon.svg";
import HostedStrip from "../components/HostedStrip";
import attendees from "../assets/attendees.svg";
import banner from "../assets/sampleBanner.png";
import location from "../assets/calendar-tick.svg";
import { contractAddress } from "../utils/address";
import { contractAbi } from "../abi/abi";
import { useReadContract } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shortString } from "starknet";

function EventDetailsPage() {
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { eventId } = useParams();

  // Create proper uint256 format for event_id
  const eventIdBigInt = {
    type: "struct",
    low: BigInt(eventId || "1"),
    high: BigInt(0),
  };

  const { data, error: contractError } = useReadContract({
    functionName: "event_details",
    args: [eventIdBigInt],
    abi: contractAbi,
    address: contractAddress,
    watch: true,
  });

  console.log(eventData, "eventData_____________hhhhhhh");
  console.log(data, "Data_____________data");

  const decodeByteArray = (byteArray) => {
    if (!byteArray?.data) return "";
    try {
      return byteArray.data
        .filter(Boolean) // Remove any null/undefined values
        .map((num) => shortString.decodeShortString(num.toString()))
        .join("");
    } catch (error) {
      console.error("Error decoding ByteArray:", error);
      return "Error decoding";
    }
  };

  // Process the event data
  const processEventData = (data) => {
    if (!data) return null;

    try {
      return {
        name: decodeByteArray(data.name),
        location: decodeByteArray(data.location),
        totalRegister: data.total_register
          ? Number(data.total_register.low)
          : 0,
        totalAttendees: data.total_attendees
          ? Number(data.total_attendees.low)
          : 0,
        isClosed: data.is_closed === true,
        eventType: data.event_type === 0 ? "Free" : "Paid",
        paidAmount: data.paid_amount ? Number(data.paid_amount.low) : 0,
      };
    } catch (error) {
      console.error("Error processing event data:", error);
      return null;
    }
  };

  useEffect(() => {
    if (contractError) {
      console.error("Contract Error:", contractError);
      setError(contractError);
      setIsLoading(false);
    }
    if (data) {
      const processedData = processEventData(data);
      console.log("Processed Event Data:", processedData);
      setEventData(processedData);
      setIsLoading(false);
    }
  }, [data, contractError]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-white">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 text-red-700">
          Error fetching event details: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[2.6fr_1fr] gap-x-4">
      <div className="relative bg-[#0D0C0C] w-full h-[85vh] overflow-y-scroll pt-[102px] px-[49px] pb-[56px] text-white">
        <div className="absolute top-6 left-6 flex items-center gap-x-4 text-base font-medium">
          <button className="flex gap-x-2 items-center py-1 pr-4 border-r-[#FF4B8B] border-r-[1px]">
            <img src={leftArr} alt="" />
            Back
          </button>
          <h6>{eventData?.name || "chainEvent"}</h6>
        </div>
        <img src={banner} className="w-full" alt="" />

        <h3 className="text-2xl font-bold mt-4">
          {eventData?.name || "chainEvent"}
        </h3>
        <h4 className="text-base text-[#878787]">
          Exploring starknet ecosystem
        </h4>
        <div className="flex mt-2 items-center mb-[23px] gap-x-6 text-sm text-[#66E372]">
          <div className="flex items-center gap-x-2">
            <img src={location} alt="" />
            <h6>24th March - 26th March 2024</h6>
          </div>
          <div className="flex items-center gap-x-2">
            <img src={location} alt="" />
            <h6>{eventData?.location || "Loading location..."}</h6>
          </div>
        </div>
        <div className="pt-4 text-white text-[12px]">
          <h1 className="font-bold text-sm leading-8">About This Event</h1>
          <p>
            Join us for an exciting and insightful event dedicated to the
            StarkNet ecosystem, taking place at The Zone in Lagos! This event is
            a unique opportunity to delve into the innovative world of StarkNet,
            a cutting-edge Layer 2 solution on the Ethereum blockchain that
            promises to revolutionize scalability and security in the
            decentralized ecosystem. Join us for an exciting and insightful
            event dedicated to the StarkNet ecosystem, taking place at The Zone
            in Lagos! This event is a unique opportunity to delve into the
            innovative world of StarkNet, a cutting-edge Layer 2 solution on the
            Ethereum blockchain that promises to revolutionize scalability and
            security in the decentralized ecosystem.{" "}
          </p>

          <h1 className="font-bold text-sm mt-4 leading-8">
            {" "}
            Event Highlights
          </h1>
          <p className="leading-6">
            Date & Time: [Insert Date] from [Insert Time] to [Insert Time]
            Venue: The Zone, Lagos Focus: In-depth discussions, networking
            opportunities, and hands-on sessions about StarkNet and its impact
            on the blockchain ecosystem. What to Expect Keynote Presentations
            Leading experts and developers will share their insights on
            StarkNet&apos;s architecture, use cases, and the future of Layer 2
            solutions. Panel Discussions Engage with a diverse panel of
            blockchain professionals discussing the challenges and opportunities
            within the StarkNet ecosystem. Workshops and Demos--- Participate in
            hands-on workshops and live demonstrations showcasing
            StarkNet&apos;s capabilities and its integration with various dApps
            and projects. Networking Sessions Connect with industry peers,
            developers, and blockchain enthusiasts to exchange ideas,
            collaborate, and explore new opportunities within the StarkNet
            community. Q&A Sessions Get your questions answered by StarkNet
            experts and gain a deeper understanding of how StarkNet can enhance
            your projects. Why Attend? Learn from the Best: Gain insights from
            top-notch speakers and industry leaders who are at the forefront of
            blockchain technology and Layer 2 solutions. Hands-On Experience:
            Participate in interactive sessions and gain practical knowledge on
            how to implement and leverage StarkNet for your projects. Networking
            Opportunities: Meet and connect with like-minded individuals,
            potential collaborators, and key stakeholders in the blockchain
            space. Stay Ahead: Keep up with the latest developments in the
            StarkNet ecosystem and understand how it can benefit your projects
            and business. About StarkNet StarkNet is a decentralized,
            permissionless, and highly scalable Layer 2 network built on
            Ethereum. It leverages zk-STARKs (Zero-Knowledge Scalable
            Transparent Arguments of Knowledge) to provide unmatched scalability
            and security, enabling developers to build and deploy dApps with
            higher efficiency and lower costs. About The Zone, Lagos The Zone is
            a premier event space in Lagos, known for its modern facilities and
            vibrant atmosphere. It is the perfect venue to host this pivotal
            event, providing attendees with a comfortable and conducive
            environment for learning and networking. Join us at The Zone in
            Lagos to explore the future of the StarkNet ecosystem and be part of
            the next wave of blockchain innovation. Don’t miss out on this
            opportunity to enhance your knowledge, network with industry
            leaders, and stay ahead in the rapidly evolving world of blockchain
            technology. Register Now! [Insert Registration Link] For more
            information, please visit our website or contact us at [Insert
            Contact Information]. We look forward to seeing you at the event!
          </p>
        </div>
      </div>
      <div className="pt-6 pb-[65px] bg-[#0D0C0C] text-white px-[23px]">
        <h2 className="text-base font-medium text-center pb-5 border-b-[0.5px] border-[#FAA2C1] mb-4">
          Details
        </h2>
        <div className="text-base flex flex-col gap-y-4 pb-4 border-b-[0.5px] border-b-[#FAA2C1] mb-4">
          <h3>
            {" "}
            <span className="text-[#878787] font-medium">Format:</span>{" "}
            {eventData?.eventType}
          </h3>
          <h3>
            <span className="text-[#878787] font-medium">Main link: </span>
            https://meet.google.com/iyu-ngra-meu
          </h3>
          <h3>
            <span className="text-[#878787] font-medium">Social: </span>
            @starkware
          </h3>
        </div>
        <div className="text-base flex flex-col pb-4 border-b-[0.5px] border-b-[#FAA2C1] mb-4">
          <h4 className="flex items-center gap-x-1 text-xs font-medium text-[#878787] mb-2">
            <img src={locationIcon} alt="" /> Location
          </h4>
          <h3>{eventData?.location || "incoming"}</h3>
        </div>
        <div className="text-base flex flex-col pb-4 border-b-[0.5px] border-b-[#FAA2C1] mb-6">
          <h4 className="text-xs font-medium mb-2 text-[#878787]">Hosted by</h4>
          <div className="flex flex-col gap-y-2">
            <HostedStrip hostName="Starkware" />
            <HostedStrip hostName="Starknet" />
            <HostedStrip hostName="Starknet Nigeria" />
          </div>
        </div>
        <div className="text-base flex flex-col pb-4 border-b-[0.5px] border-b-[#FAA2C1]">
          <h4 className="text-xs font-medium mb-2 ">
            {eventData?.totalRegister || 0} Attendees Registered
          </h4>
          <img src={attendees} className="w-[122px] mb-1" alt="" />
          <h6 className="text-[8px] font-medium">
            Joel Adewole, Zaff and{" "}
            {Math.max((eventData?.totalRegister || 0) - 2, 0)} others
          </h6>
        </div>
        <h6 className="mb-2 mt-4">
          {eventData?.totalRegister || 0} Tickets sold
        </h6>
        <h6>3 Reclaimed</h6>
      </div>
    </div>
  );
}

export default EventDetailsPage;
