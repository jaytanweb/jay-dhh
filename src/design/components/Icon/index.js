import React, { useRef, useState, useEffect, useMemo } from 'react';
import SVG from 'react-inlinesvg';
import styled, { css } from 'styled-components';

import { useTheme } from '@/design/hooks/Theme';

import edit from './assets/svg_icon_edit.svg';
import question from './assets/svg_icon_question.svg';
import wechat from './assets/svg_icon_wechat.svg';
import dingtalk from './assets/svg_icon_dingtalk.svg';
import clockCircle from './assets/svg_icon_clockCircle.svg';
import calendar from './assets/svg_icon_calendar.svg';
import more from './assets/svg_icon_more.svg';
import star from './assets/svg_icon_star.svg';
import thunderbolt from './assets/svg_icon_thunderbolt.svg';
import deleteIcon from './assets/svg_icon_delete.svg';
import pushPin from './assets/svg_icon_pushpin.svg';
import paperClip from './assets/svg_icon_paperClip.svg';
import user from './assets/svg_icon_user.svg';
import male from './assets/svg_icon_male.svg';
import female from './assets/svg_icon_female.svg';
import team from './assets/svg_icon_team.svg';
import search from './assets/svg_icon_search.svg';
import filter from './assets/svg_icon_filter.svg';
import heart from './assets/svg_icon_heart.svg';
import bookmark from './assets/svg_icon_bookmark.svg';
import left from './assets/svg_icon_left.svg';
import right from './assets/svg_icon_right.svg';
import close from './assets/svg_icon_close.svg';
import arrowLeft from './assets/svg_icon_arrowLeft.svg';
import arrowRight from './assets/svg_icon_arrowRight.svg';
import arrowDown from './assets/svg_icon_arrowDown.svg';
import check from './assets/svg_icon_check.svg';
import singleSelect from './assets/svg_icon_singleSelect.svg';
import multipleSelect from './assets/svg_icon_multipleSelect.svg';
import plus from './assets/svg_icon_plus.svg';
import minus from './assets/svg_icon_minus.svg';
import play from './assets/svg_icon_play.svg';
import file from './assets/svg_icon_file.svg';
import img from './assets/svg_icon_img.svg';
import video from './assets/svg_icon_video.svg';
import filePreview from './assets/svg_icon_filePreview.svg';
import imgPreview from './assets/svg_icon_imgPreview.svg';
import videoPreview from './assets/svg_icon_videoPreview.svg';
import text from './assets/svg_icon_text.svg';
import dustbin from './assets/svg_icon_dustbin.svg';
import location from './assets/svg_icon_location.svg';
import loading from './assets/svg_icon_loading.svg';
import empty from './assets/svg_icon_empty.svg';

import stateComplete from './assets/svg_icon_stateComplete.svg';
import stateError from './assets/svg_icon_stateError.svg';
import stateWarn from './assets/svg_icon_stateWarn.svg';
import stateInfo from './assets/svg_icon_stateInfo.svg';

const Svg = styled(SVG)(({ color, clickable }) => {
  return clickable
    ? `
    fill: ${color};

    & path {
      fill: ${color};
    }
    &:hover {
        cursor: pointer;

        & path {
          fill: ${color}66;
        }
      }

      &:active path {
        fill: ${color}99;
      }
`
    : `
        fill: ${color};

        & path {
          fill: ${color};
        }
    `;
});

const SvgIcon = ({
  type,
  size,
  color,
  children,
  style = {},

  onClick,
  disabled,
  ...rest
}) => {
  const [
    {
      padding,
      size: themeSize,
      color: { primary },
    },
  ] = useTheme();
  // 大小
  const iconSize = useMemo(() => {
    if (typeof size !== 'number') {
      return themeSize.s_20;
    }
    return size;
  }, [size]);

  // 类型
  const icon = useMemo(() => {
    const icons = {
      edit,
      question,
      wechat,
      dingtalk,
      clockCircle,
      calendar,
      more,
      star,
      thunderbolt,
      delete: deleteIcon,
      pushPin,
      paperClip,
      user,
      male,
      female,
      team,
      search,
      filter,
      heart,
      bookmark,
      left,
      right,
      close,
      arrowLeft,
      arrowRight,
      arrowDown,
      check,
      plus,
      minus,
      singleSelect,
      multipleSelect,
      empty,
      play,
      file,
      img,
      video,
      filePreview,
      imgPreview,
      videoPreview,
      text,
      dustbin,
      location,
      loading,
      stateComplete,
      stateError,
      stateWarn,
      stateInfo,
      // 缺省图标类型
      default: question,
    };
    return icons[type] || icons.default;
  }, [type]);

  const clickable = typeof onClick === 'function' ? 1 : 0;

  return (
    <span
      style={{
        width: iconSize + themeSize.s_1,
        height: iconSize + themeSize.s_1,
        padding: padding.mini / 2,
        display: 'inline-grid',
        placeContent: 'center center',
        cursor: disabled ? 'not-allowed' : clickable ? 'pointer' : 'normal',
        ...style,
      }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      <Svg
        src={icon}
        clickable={clickable}
        color={color || primary.default}
        style={{
          width: iconSize,
          height: iconSize,
        }}
      />
    </span>
  );
};

export default SvgIcon;
