"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pixelActions } from "../redux/pixel/pixelSlice";
import useArraySelector from "../functions/hooks/useArraySelector";
import ArtList from "../components/art-list";
import Container from "../components/container";
import Divider from "../components/divider";
import MyArts from "../components/my-arts";
import Navbar from "../components/navbar";
import _ from "lodash";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const globalPixelList = useArraySelector(({ pixel }) => pixel.globalPixels);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGlobalPixels("", true);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(pixelActions.setInfo(null));
    };
  }, []);

  const getGlobalPixels = (
    searchText,
    isNewSearch = false,
    debounce = false
  ) => {
    if (isNewSearch) {
      setLoading(true);
    }
    if (debounce) {
      dispatch(
        pixelActions.getGlobalPixelsSearchRequest({
          searchText: searchText.trim(),
          isNewSearch: true,
          onSuccess: () => {
            setLoading(false);
          },
          onFailure: () => {
            setLoading(false);
          },
        })
      );
    } else {
      dispatch(
        pixelActions.getGlobalPixelsRequest({
          searchText: searchText || isNewSearch ? searchText.trim() : null,
          isNewSearch,
          onSuccess: () => {
            setLoading(false);
          },
          onFailure: () => {
            setLoading(false);
          },
        })
      );
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchText(value);

    if (_.size(value) > 2) {
      getGlobalPixels(searchText, true, true);
    } else if (_.size(value) === 0) {
      getGlobalPixels("", true);
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        {user && (
          <>
            <MyArts />
            <Divider />
          </>
        )}

        <ArtList
          title="All Arts"
          handleSearch={handleSearch}
          searchText={searchText}
          list={globalPixelList}
          loading={loading}
          getList={getGlobalPixels}
        />
      </Container>
    </>
  );
}
