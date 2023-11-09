import React, { useLayoutEffect, useRef } from "react";
import CommonStyles from "../../components/CommonStyles";
import CommonIcons from "../../components/CommonIcons";
import ModelCard from "./components/ModelCard";

const tabs = [
  {
    title: "Models",
    icon: <CommonIcons.People style={{ fontSize: "32px", color: "#fff" }} />,
    total: 55,
  },
  {
    title: "Products",
    icon: <CommonIcons.Product style={{ fontSize: "32px", color: "#fff" }} />,
    total: 24320,
  },
  {
    title: "Categories",
    icon: <CommonIcons.Category style={{ fontSize: "32px", color: "#fff" }} />,
    total: 25,
  },
];

const models = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const VirtualTryOn = () => {
  //! State
  const [currentTab, setCurrentTab] = React.useState("Dashboard");

  //! Function

  //! Render
  return (
    <CommonStyles.Box
      sx={{
        padding: "50px 30px",
      }}
    >
      <CommonStyles.Box
        sx={{
          position: "absolute",
          top: "20px",
          left: "30px",
          display: "flex",
          gap: "25px",
        }}
      >
        {["Dashboard", "Studio"].map((tab) => {
          return (
            <CommonStyles.Chip
              content={tab}
              active={currentTab === tab}
              key={tab}
              onClick={() => {
                setCurrentTab(tab);
              }}
            />
          );
        })}
      </CommonStyles.Box>
      <CommonStyles.Box>
        {/* Header content */}
        <CommonStyles.Box
          centered
          sx={{
            justifyContent: "space-between",
          }}
        >
          <CommonStyles.Typography type="boldText24" sx={{ color: "#a04aff" }}>
            Virtual Dressing Room Dashboard
          </CommonStyles.Typography>
          <CommonStyles.Box
            centered
            sx={{
              gap: "32px",
            }}
          >
            <CommonStyles.Box
              centered
              sx={{
                gap: "8px",
              }}
            >
              <CommonIcons.Gender
                style={{ fontSize: "16px", color: "#a04aff" }}
              />
              <CommonStyles.Typography type="body18">
                All genders
              </CommonStyles.Typography>
            </CommonStyles.Box>
            <CommonStyles.Box
              centered
              sx={{
                gap: "8px",
              }}
            >
              <CommonIcons.Size
                style={{ fontSize: "24px", color: "#a04aff" }}
              />
              <CommonStyles.Typography type="body18">
                All sizes
              </CommonStyles.Typography>
            </CommonStyles.Box>
            <CommonStyles.Box
              centered
              sx={{
                gap: "8px",
              }}
            >
              <CommonIcons.Calendar
                style={{ fontSize: "16px", color: "#a04aff" }}
              />
              <CommonStyles.Typography type="body18">
                Last 30 days
              </CommonStyles.Typography>
            </CommonStyles.Box>
          </CommonStyles.Box>
        </CommonStyles.Box>

        {/* Summary */}
        <CommonStyles.Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(3, calc((100% - 30px * 3) / 4))",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          {tabs.map((item) => {
            return (
              <CommonStyles.Box
                key={item.title}
                sx={{
                  background: "#fff",
                  boxShadow: "0 3px 6px rgba(0,0,0,0.2)",
                  borderRadius: "8px",
                  padding: "20px 20px",
                  display: "flex",
                  gap: "20px",
                }}
              >
                <CommonStyles.Box
                  centered
                  sx={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    opacity: 0.8,
                    background: "#a04aff",
                  }}
                >
                  {item.icon}
                </CommonStyles.Box>
                <CommonStyles.Box>
                  <CommonStyles.Typography
                    type="body18"
                    sx={{ opacity: "0.7" }}
                  >
                    {item.title}
                  </CommonStyles.Typography>
                  <CommonStyles.Typography type="boldText24">
                    {item.total}
                  </CommonStyles.Typography>
                </CommonStyles.Box>
              </CommonStyles.Box>
            );
          })}
        </CommonStyles.Box>

        <CommonStyles.Box
          centered
          sx={{
            justifyContent: "space-between",
            marginTop: "35px",
          }}
        >
          <CommonStyles.Typography type="boldText24" sx={{ color: "#a04aff" }}>
            Top 12 models
          </CommonStyles.Typography>

          <CommonStyles.Box>
            <CommonStyles.Typography type="body14" sx={{ color: "#a04aff" }}>
              View all models
            </CommonStyles.Typography>
          </CommonStyles.Box>
        </CommonStyles.Box>

        <CommonStyles.Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "30px",
            padding: "20px 30px",
          }}
        >
          {models.map((item) => {
            return <ModelCard key={item} item={item} />;
          })}
        </CommonStyles.Box>
      </CommonStyles.Box>
    </CommonStyles.Box>
  );
};

export default VirtualTryOn;
