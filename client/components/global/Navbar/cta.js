import CustomLink from '../../shared/CustomLink';

const Cta = ({ href, target, label }) => {
  return (
    <button
      type="button"
      className="py-2 px-6 bg-primary hover:bg-secondary text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-full hidden lg:block"
    >
      <CustomLink href={href} target={target} label={label} isExternal={true} />
    </button>
  );
};

export default Cta;
