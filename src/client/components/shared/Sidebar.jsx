import React from 'react';
import { Card, CardBlock, CardText } from 'reactstrap';

function Sidebar() {
  return (
    <aside className="col-sm-12 col-md-4">
      <Card>
        <CardBlock>
          <CardText>
            Sidebar Item6
          </CardText>
        </CardBlock>
      </Card>
    </aside>
  );
}

export default Sidebar;
