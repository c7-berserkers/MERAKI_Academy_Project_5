import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
export default function SearchPage() {
  const BACKEND = process.env.REACT_APP_BACKEND;
  const { token } = useSelector((state) => {
    return {
      token: state.auth.token,
    };
  });
  const { name } = useParams();
  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState([]);
  const [noResults, setNoResults] = useState(false);
  useEffect(() => {
    axios
      .get(`${BACKEND}/users/search/${name}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setNoResults(false);
        setSearchResult(result.data.users);
      })
      .catch((error) => {
        console.log(error.response.data);
        setNoResults(true);
      });
  }, [name]);

  return (
    <div>
      <Container>
        <h1>Search Result for {name}</h1>
      </Container>
      <Container>
        {noResults ? (
          <>
            <h2>No results for {name}</h2>
          </>
        ) : (
          <>
            {" "}
            {searchResult.length > 0 ? (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                  }}
                >
                  {searchResult.map((user) => {
                    return (
                      <Card
                        onClick={(e) => navigate(`/profile/${user.id}`)}
                        key={user.id}
                        sx={{
                          width: 275,
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          alignItems: "center",
                          height: "200px",
                          margin: "20px",
                          padding: "20px",
                          cursor: "pointer",
                        }}
                      >
                        <Avatar
                          sx={{ height: "100px", width: "100px" }}
                          alt="Remy Sharp"
                          src={user.img}
                        />
                        <h4>
                          {user.first_name} {user.last_name}
                        </h4>
                      </Card>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <Stack spacing={1}>
                  {/* For variant="text", adjust the height via font-size */}
                  <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                  {/* For other variants, adjust the size with `width` and `height` */}
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="rectangular" width={210} height={60} />
                  <Skeleton variant="rounded" width={210} height={60} />
                </Stack>
              </>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
