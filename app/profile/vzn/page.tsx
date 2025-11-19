import VznChat from "../../components/VznChat";
export default function VznProfile() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">VZN AI</h1>
      <VznChat apiText="https://YOUR_TEXT_API_ENDPOINT" apiImage="https://YOUR_IMAGE_API_ENDPOINT" />
    </div>
  );
}
