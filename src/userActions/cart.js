import React, { useContext, useState } from "react";
import AuthContext from "../Authentication/AuthContext";
import {
  useQuery,
  useQueryClient,
  QueryClientProvider,
  useMutation,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const ExampleComponent = () => {
  const queryClient = useQueryClient();
  const peopleData = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:3001/cart/${peopleData.userId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  };

  const { data, isLoading, isError } = useQuery("data", fetchData);
  const [editableUser, setEditableUser] = useState(null);

  const updateUserInfoMutation = useMutation(
    async ({ newName, newEmail }) => {
      try {
        {
          const response = await fetch(
            `http://localhost:3001/updateCart/${peopleData.userId}/${editableUser._id}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({ newName, newEmail }),
            }
          );

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const updatedUserData = await response.json();
          console.log("updatedUserData", updatedUserData);
          return updatedUserData;
        }
      } catch (error) {
        console.error("Error during deleteUserInfoMutation:", error);
        throw error;
      }
    },
    {
      onSuccess: (updatedUserData) => {
        queryClient.setQueryData("data", updatedUserData?.user?.Cart);
        setEditableUser(null);
      },
    }
  );

  const deleteUserInfoMutation = useMutation(
    async ({ deleteItemId }) => {
      try {
        const response = await fetch(
          `http://localhost:3001/deletePeople/${peopleData.userId}/${deleteItemId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const afterDeleteData = await response.json();
        return afterDeleteData;
      } catch (error) {
        console.error("Error during deleteUserInfoMutation:", error);
        throw error;
      }
    },
    {
      onSuccess: (afterDeleteData) => {
        console.log("afterDeleteData", afterDeleteData);
        queryClient.setQueryData("data", afterDeleteData?.user?.Cart);
        setEditableUser(null);
      },
    }
  );

  const handleDeleteClick = (user) => {
    if (user?._id) {
      deleteUserInfoMutation.mutate({ deleteItemId: user._id });
    }
  };

  const handleSaveClick = async () => {
    console.log("editableUser", editableUser);
    if (editableUser && editableUser._id) {
      updateUserInfoMutation.mutate({
        newName: editableUser.newName,
        newEmail: editableUser.newEmail,
      });
    }
  };

  const handleEditClick = (user) => {
    setEditableUser({
      ...user,
      editing: true,
      newName: user.userName,
      newEmail: user.useremail,
    });
  };

  const handleCancelClick = () => {
    setEditableUser(null);
  };

  const handleOnChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>My Users</h1>
        <ul>
          {data.items && data.items.length > 0 ? (
            data.items.map((item) => (
              <li key={item._id}>
                <h2>
                  {editableUser &&
                  editableUser._id === item._id &&
                  editableUser.editing ? (
                    <input
                      type="text"
                      name="newName"
                      value={editableUser.newName}
                      onChange={handleOnChange}
                    />
                  ) : (
                    item.userName
                  )}
                </h2>
                <h2>
                  {editableUser &&
                  editableUser._id === item._id &&
                  editableUser.editing ? (
                    <input
                      type="email"
                      name="newEmail"
                      value={editableUser.newEmail}
                      onChange={handleOnChange}
                    />
                  ) : (
                    item.useremail
                  )}
                </h2>
                {editableUser &&
                editableUser._id === item._id &&
                editableUser.editing ? (
                  <div>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => handleEditClick(item)}>Edit</button>
                    <button onClick={() => handleDeleteClick(item)}>
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <div>No items found</div>
          )}
        </ul>
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default ExampleComponent;

// export default ExampleComponent;
