import { CogIcon, LinkIcon, UserAddIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ColorPalette from "../../components/color-palette";
import MemberList from "../../components/member-list";
import Navbar from "../../components/navbar";
import PixelTable from "../../components/pixel-table";
import { pixelActions } from "../../redux/pixel/pixelSlice";
import { MyRouter } from "../../routes";
import useArraySelector from "../../functions/hooks/useArraySelector";
import cs from "classnames";
import AddTeamMembersModal from "../../components/modals/add-team-members-modal";
import LeaveTeamModal from "../../components/modals/leave-team-modal";
import { ClipLoader } from "react-spinners";
import Link from "next/link";

export default function Pixel() {
  const router = useRouter();
  const { pixelSlug } = router.query;
  const [selectedColor, setSelectedColor] = useState("#001219");
  const user = useSelector((state) => state.auth.user);
  const members = useArraySelector((state) => state.pixel.members);
  const member = _.find(members, (mem) => mem.userId === user?._id);
  const canDraw = member && ["owner", "editor"].includes(member?.role);
  const pixel = useSelector((state) => _.get(state.pixel.pixels, pixelSlug));
  const dispatch = useDispatch();
  const [leftPixel, setLeftPixel] = useState(null);
  const [addMembersShow, setAddMembersShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (pixelSlug) {
      dispatch(
        pixelActions.getPixelBySlugRequest({
          slug: pixelSlug,
          onSuccess: () => {
            setLoading(false);
          },
          onFailure: () => {
            router.push("/");
          },
        })
      );
    }
  }, [pixelSlug]);

  const download = () => {
    html2canvas(document.querySelector("#pixel-table")).then((canvas) => {
      canvas.toBlob(function (blob) {
        saveCanvasToDisk(blob, "png");
      });
    });
  };

  const saveCanvasToDisk = (blob, fileExtension) => {
    saveAs(blob, `${pixel?.name}.${fileExtension}`);
  };

  const copyCode = () => {
    toast.success("Link's copied");
    const url = window.location;
    navigator.clipboard.writeText(url);
  };

  const leavePixel = () => {
    setIsLoading(true);
    dispatch(
      pixelActions.deleteMemberRequest({
        pixelId: leftPixel?.pixelId,
        pixelSlug: leftPixel?.pixelSlug,
        memberId: user?._id,
        onSuccess: () => {
          setIsLoading(false);
          setLeftPixel(null);
        },
        onFailure: () => setIsLoading(false),
      })
    );
  };

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="items-center flex flex-col mt-24">
          <ClipLoader color="orange" loading={loading} size={120} />
        </div>
      ) : (
        <div className="max-w-full mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-center mt-8">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-center">
              {pixel?.name}
            </h2>
            <div className="flex items-center mt-2">
              {canDraw && (
                <button
                  type="button"
                  className="w-6 h-6 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                  onClick={() => setAddMembersShow(true)}
                >
                  <span className="sr-only">Add Member</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                    />
                  </svg>
                </button>
              )}

              <button
                type="button"
                className="ml-2 w-6 h-6 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                onClick={copyCode}
              >
                <span className="sr-only">Info</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                  />
                </svg>
              </button>

              {member?.role === "owner" ? (
                <Link href={MyRouter.pixelSettings(pixel?.slug)}>
                  <CogIcon
                    className="ml-2 w-6 h-6 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Link>
              ) : (
                member?.role === "editor" && (
                  <button
                    className="ml-2"
                    onClick={() =>
                      setLeftPixel({
                        pixelId: pixel?._id,
                        pixelSlug: pixel?.slug,
                      })
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 text-gray-400 hover:text-gray-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col 2xl:flex-row 2xl:order-none">
            <div className="2xl:w-1/2 order-last 2xl:order-none">
              <MemberList />
            </div>

            <div className="grow order-first 2xl:order-none flex justify-center items-center w-full h-full">
              <PixelTable
                size={pixel?.size}
                drawColor={selectedColor}
                canDraw={canDraw}
              />
            </div>
            <div className="2xl:w-1/2 flex justify-center">
              <div className="py-6 md:py-16 flex flex-col items-center">
                <ColorPalette
                  canDraw={canDraw}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                />
                <button
                  type="button"
                  className="mt-12 inline-flex items-center px-24 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  onClick={download}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {addMembersShow && (
        <AddTeamMembersModal
          show={addMembersShow}
          setShow={setAddMembersShow}
        />
      )}
      {leftPixel && (
        <LeaveTeamModal
          onCancel={() => setLeftPixel(null)}
          onLeave={leavePixel}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
