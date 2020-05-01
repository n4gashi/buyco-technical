import React, { useState, useMemo, useCallback, useEffect } from "react";
import useQuery, { QueryRequestConfig } from "hooks/useQuery";
import User from "./components/User";
import Table from "components/Table";
import TableHeader from "components/Table/TableHeader";
import TableBody from "components/Table/TableBody";
import Button from "components/Button";
import EmptyState from "./components/EmptyState";
import useMutation from "hooks/useMutation";

const fetchUsersConfig: QueryRequestConfig = {
  method: "GET",
  url: "/users",
};

const columnNames = {
  username: "Username",
  name: "Name",
  email: "Email",
  phone: "Phone",
  website: "Website",
  companyName: "Company",
  street: "Street",
  city: "City",
  zipcode: "Zip code",
};

const defaultSelected: number[] = [];

const Users: React.FC = () => {
  const [selected, setSelected] = useState<number[]>(defaultSelected);
  const [usersResponse, fetchUsers] = useQuery(fetchUsersConfig);
  const [, , deleteUserRequest] = useMutation();

  // #region Methods
  const selectItem = useCallback(
    (identifier: number) => {
      return () => {
        if (!selected.find((id) => id === identifier)) {
          setSelected([...selected, identifier]);
        } else {
          setSelected(selected.filter((id) => id !== identifier));
        }
      };
    },
    [selected]
  );

  const selectAllItems = useCallback(() => {
    if (!!selected.length) {
      setSelected([]);
    } else {
      setSelected(usersResponse?.data.map((u: UserType) => u.id) || []);
    }
  }, [selected, usersResponse]);

  const deleteSelection = useCallback(() => {
    if (!selected.length) {
      return;
    }

    Promise.all(
      usersResponse?.data
        .filter((user) => selected.includes(user.id))
        .map((user) => {
          return deleteUserRequest({
            method: "DELETE",
            url: `/users/${user.id}`,
          });
        }) || []
    ).then(() => {
      fetchUsers();
    });
  }, [selected, usersResponse, deleteUserRequest, fetchUsers]);

  const areAllSelected = useMemo(() => {
    if (!usersResponse) {
      return false;
    }
    return selected.length === usersResponse?.data.length;
  }, [selected, usersResponse]);
  // #endregion

  // #region Non-state variables
  const userList = useMemo(() => {
    if (!usersResponse?.data.length) {
      return null;
    }
    return usersResponse?.data.map((user: UserType) => (
      <User
        // bad practice usually but ok for the test
        key={user.id}
        selected={!!selected.find((id) => id === user.id)}
        username={user.username}
        name={user.name}
        email={user.email}
        phone={user.phone}
        website={user.website}
        companyName={user.company.name}
        street={user.address.street}
        city={user.address.city}
        zipcode={user.address.zipcode}
        onClick={selectItem(user.id)}
      />
    ));
  }, [usersResponse, selectItem, selected]);
  // #endregion

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <h1>Users</h1>
      <div
        style={{
          textAlign: "right",
          visibility: !!selected.length ? "visible" : "hidden",
        }}
      >
        <Button onClick={deleteSelection}>Delete</Button>
      </div>
      <Table>
        <TableHeader>
          <User
            {...columnNames}
            onClick={selectAllItems}
            selected={areAllSelected}
          />
        </TableHeader>
        <TableBody>
          {userList || (
            <EmptyState>The users list is currently empty</EmptyState>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default Users;

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
