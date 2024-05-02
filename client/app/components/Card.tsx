interface CardProps {
  name: string;
  description: string;
}

export const Card = ({ name, description }: CardProps) => {
  return (
    <div className="bg-[#313749] w-[20vw] h-[30vh] rounded-3xl p-5 hover:scale-110 duration-500">
      <h1 className="font-heading font-semibold text-3xl text-purple-200 mb-5">
        {name}
      </h1>
      <p>{description}</p>
    </div>
  );
};
