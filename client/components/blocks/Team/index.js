import Header from '../../shared/Header';
import MemberCards from './member-cards';

const Team = ({ header, members, buttonLabel } ) => {
  return (
    <div className="p-8 bg-white rounded-lg">
      <Header {...header} />
      <MemberCards members={members} buttonLabel={buttonLabel} />
    </div>
  );
};

Team.defaultProps = {};

export default Team;
