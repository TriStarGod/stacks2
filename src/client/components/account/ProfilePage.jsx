import React from 'react';

import Sidebar from '../shared/Sidebar';

function ProfilePage({ match }) {
  return (
    <div className="row">
      <div className="col-sm-12 col-md-8">
        This is the profile page. The profile id is: {match.params.id}
      </div>
      <Sidebar />
    </div>
  );
}

export default ProfilePage;
