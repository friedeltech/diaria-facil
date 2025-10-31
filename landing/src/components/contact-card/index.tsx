interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  contactInfo: string;
  href: string;
  iconBgColor: string;
  contactColor: string;
}

export default function ContactCard({
  icon,
  title,
  description,
  contactInfo,
  href,
  iconBgColor,
  contactColor,
}: ContactCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer block"
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-16 h-16 ${iconBgColor} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
        <h2 className="text-xl font-semibold mb-3 text-gray-800">{title}</h2>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <span className={`${contactColor} font-medium  break-all`}>
          {contactInfo}
        </span>
      </div>
    </a>
  );
}
