-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- 主機: 127.0.0.1
-- 產生時間： 2017 �?07 ??07 ??04:57
-- 伺服器版本: 5.6.24
-- PHP 版本： 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 資料庫： `kbnat`
--

-- --------------------------------------------------------

--
-- 資料表結構 `exam_record_its`
--

CREATE TABLE IF NOT EXISTS `exam_record_its` (
  `its_sn` bigint(15) NOT NULL COMMENT '流水號',
  `user_id` varchar(40) NOT NULL COMMENT '使用者id',
  `indicate_id` varchar(15) NOT NULL COMMENT '能力指標代號',
  `date` varchar(30) NOT NULL COMMENT '施測日期',
  `start_time` varchar(14) NOT NULL COMMENT '開始時間',
  `stop_time` varchar(14) NOT NULL DEFAULT '' COMMENT '完成時間',
  `during_time` varchar(16) NOT NULL COMMENT '測驗時間',
  `item_num` smallint(3) NOT NULL COMMENT '元件編號',
  `org_res` mediumtext COMMENT '原始作答情形',
  `pattern_type` varchar(200) DEFAULT NULL COMMENT '作答類型代號',
  `bug_pattern` varchar(200) DEFAULT NULL COMMENT '錯誤類型樣態'
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='互動教學元件結果';

--
-- 資料表的匯出資料 `exam_record_its`
--

INSERT INTO `exam_record_its` (`its_sn`, `user_id`, `indicate_id`, `date`, `start_time`, `stop_time`, `during_time`, `item_num`, `org_res`, `pattern_type`, `bug_pattern`) VALUES
(0, 'test', '6-d-01', '2017-07-05 08:34:30', '1499236463320', '1499236470566', '7246', 6, '@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@@XX@1384;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@4@XX@1827;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@@XX@2197;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@8@XX@3506;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@@XX@3862;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@2@XX@4202;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@@XX@4486;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@5101;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@5131;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@@XX@5478;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@2@XX@6070;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@26@XX@6382;}@xx@', NULL, NULL),
(0, 'test', '6-d-01', '2017-07-05 09:38:46', '1499240309094', '1499240326280', '17186', 6, '@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@@XX@1610;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@1@XX@3245;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;message:請分別計數各血型種類的人數，並填入框中。@XX@4074;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@@XX@4649;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@2@XX@5048;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@2@XX@5048;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;message:請分別計數各血型種類的人數，並填入框中。@XX@5874;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@@XX@6522;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@4@XX@6961;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@4@XX@6962;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@4@XX@6962;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@@XX@7609;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@2@XX@8458;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;message:請分別計數各血型種類的人數，並填入框中。@XX@9218;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@@XX@9682;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@8@XX@10204;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@8@XX@10204;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@@XX@10642;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@1@XX@11282;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;message:請分別計數各血型種類的人數，並填入框中。@XX@12586;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@@XX@13115;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@2@XX@13342;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@2@XX@13342;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@@XX@13938;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@14275;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@14319;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@@XX@14922;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@2@XX@15420;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@26@XX@15768;}@xx@', NULL, NULL),
(0, 'test', '6-d-01', '2017-07-06 08:12:04', '1499321456905', '1499321473381', '16476', 6, '@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@@XX@2075;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_1@XX@4@XX@3380;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@@XX@6541;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_2@XX@8@XX@7555;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@@XX@8085;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_3@XX@2@XX@8595;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@@XX@9327;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@@XX@9727;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@9931;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@9931;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@9971;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_4@XX@12@XX@9972;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@@XX@10904;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@2@XX@11172;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@24@XX@11427;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;message:請分別計數各血型種類的人數，並填入框中。@XX@13594;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@@XX@14495;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@2@XX@14779;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@2@XX@14779;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@26@XX@15043;}@xx@@xx@{indicateId:6-d-01_1;item_num:6-d-01_1;id:input_5@XX@26@XX@15043;}@xx@', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
