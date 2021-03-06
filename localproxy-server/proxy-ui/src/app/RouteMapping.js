import React from "react";
import styled from "styled-components";

import Arrow from "../util/Arrow";
import Tag from "../util/Tag";

const RouteSettingsWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const OverflowWrap = styled.span`
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
`;

const colorByType = (type) => {
  switch (type) {
    case "data":
      return "marigold";
    case "ui":
      return "norman";
    case "api":
      return "thunderdome";
    default:
      return "";
  }
};

function RouteMapping({ route, updateRoute }) {
  if (route.static) {
    return (
      <>
        <span>
          <a href={route.route}>
            {route.type && (
              <Tag color={colorByType(route.type)} fixedWidth={true}>
                {route.type}
              </Tag>
            )}
            <Tag color="oz" hover="Static">
              S
            </Tag>
          </a>
        </span>

        <a href={route.route}>
          <OverflowWrap>{route.route}</OverflowWrap>
        </a>
        <Arrow />
        <OverflowWrap>{route.staticDir}</OverflowWrap>
        <RouteSettingsWrapper>
          <Tag
            enabled={route.rootIndexFallback === true}
            hover="Root Index Fallback - If the file isn't found, serve the root /index.html (for single page apps)"
            onClick={() => {
              updateRoute({
                ...route,
                rootIndexFallback: !route.rootIndexFallback,
              });
            }}
          >
            RIF
          </Tag>
          <Tag
            enabled={route.dirListings === true}
            hover="Serve directory listings if the index.html isn't found"
            onClick={() => {
              updateRoute({ ...route, dirListings: !route.dirListings });
            }}
          >
            DIR
          </Tag>
        </RouteSettingsWrapper>
      </>
    );
  }
  const target = `http://${route.hostname}:${route.port}`;
  return (
    <>
      <span>
        <a href={route.route}>
          {route.type && (
            <Tag color={colorByType(route.type)} fixedWidth={true}>
              {route.type}
            </Tag>
          )}
          <Tag color="purple" hover="Dynamic">
            D
          </Tag>
        </a>
      </span>
      <a href={route.route}>
        <OverflowWrap>{route.route}</OverflowWrap>
      </a>
      <Arrow />
      <a href={target}>
        <OverflowWrap>{target}</OverflowWrap>
      </a>
      <RouteSettingsWrapper>
        <Tag
          enabled={route.trimRoute === true}
          hover="Trim the matched route before proxying the request"
          onClick={() => {
            updateRoute({ ...route, trimRoute: !route.trimRoute });
          }}
        >
          TRIM
        </Tag>
      </RouteSettingsWrapper>
    </>
  );
}

export default RouteMapping;
