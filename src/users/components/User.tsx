import React, { useCallback } from "react";
import styled from "styled-components";
import TableRow from "components/Table/TableRow";

export interface UserProps {
  className?: string;
  selected?: boolean;
  username?: string;
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  companyName?: string;
  street?: string;
  city?: string;
  zipcode?: string;
  onClick?: Function;
}

const onChange = () => undefined;

const User: React.FC<UserProps> = (props) => {
  const {
    className,
    selected,
    username,
    name,
    email,
    phone,
    website,
    companyName,
    street,
    city,
    zipcode,
    onClick,
  } = props;

  const handleClick = useCallback(() => {
    if (typeof onClick === "function") {
      onClick();
    }
  }, [onClick]);

  return (
    <TableRow className={className} onClick={handleClick}>
      <div className="selector">
        <input
          type="checkbox"
          name=""
          id=""
          checked={selected}
          onChange={onChange}
        />
      </div>
      <div className="username" title={username}>
        {username}
      </div>
      <div className="name" title={name}>
        {name}
      </div>
      <div className="email" title={email}>
        {email}
      </div>
      <div className="phone" title={phone}>
        {phone}
      </div>
      <div className="website" title={website}>
        {website}
      </div>
      <div className="company" title={companyName}>
        {companyName}
      </div>
      <div className="street" title={street}>
        {street}
      </div>
      <div className="city" title={city}>
        {city}
      </div>
      <div className="zipcode" title={zipcode}>
        {zipcode}
      </div>
    </TableRow>
  );
};

export default styled(User)`
  border-bottom: 1px solid grey;
  display: flex;
  font-weight: 500;

  &:last-child {
    border: none;
  }

  & > .selector {
    width: auto;
    flex-grow: 0;
    text-overflow: initial;
  }

  & > div {
    padding: 16px;
    flex: 1 1 auto;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
