var publicObj = {
	init: function(){
        //点赞的请求锁
		this.upLock     = false;
        //关注的请求锁
        this.followLock = false;
        //举报动作的锁
        this.reportLock = false;
        //关注该问题的人
        this.followAskUsersLock = false;
	},
    //点赞的相关处理
    doUp : function(obj){
        if(publicObj.upLock){
            layer.msg('正在加载中...', {icon: 2, 'time': 1500, 'shade': 0.3});
            return false;
        }
        publicObj.upLock = true;
        var _self       = obj;
        var answerId    = parseInt(_self.attr('data-aid'));
        var questionId  = parseInt(_self.attr('data-qid'));
        var flag        = _self.hasClass('ask-vote-box-act');
        var voteSpan    = _self.children('.ask-vote-num');
        var voteNum     = parseInt(voteSpan.text());
        if(!answerId || !questionId || !userId){
            layer.msg('参数错误!', {icon: 2, 'time': 1500, 'shade': 0.3});
            publicObj.upLock = false;
            return false;
        }
        //
        BTF.post("Statistics/AnswerUp","answer_id=" + answerId + "&user_id=" + userId + "&question_id=" + questionId, function(data){
            if(flag){
                _self.removeClass('ask-vote-box-act');
                voteSpan.text(voteNum-1);
            }else{
                _self.addClass('ask-vote-box-act');
                voteSpan.text(voteNum+1);
            }
            publicObj.upLock = false;
        },function(error_no,error_msg){
            layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
            publicObj.upLock = false;
        });
    },
    //关注的相关处理
    doFollow : function(obj){
        if(publicObj.followLock){
            layer.msg('正在加载中...', {icon: 2, 'time': 1500, 'shade': 0.3});
            return false;
        }
        publicObj.followLock = true;
        var _self       = obj;
        var questionId  = parseInt(_self.attr('data-qid'));
        var flag        = parseInt(_self.attr('data-follow'));
        var followNum   = parseInt(_self.attr('data-num'));
        if(!questionId || !userId){
            layer.msg('参数错误!', {icon: 2, 'time': 1500, 'shade': 0.3});
            publicObj.followLock = false;
            return false;
        }
        //
        BTF.post("Statistics/QuestionFollow","&user_id=" + userId + "&question_id=" + questionId, function(data){
            if(flag == 1){
                var newNum = followNum-1;
                $('.J_follow_btn[data-qid='+questionId+']').attr('data-num',newNum);
                $('.J_follow_btn[data-qid='+questionId+']').text('关注这个问题(' + newNum + ')');
                $('.J_follow_btn[data-qid='+questionId+']').attr('data-follow',0);
            }else{
                var newNum = followNum+1;
                $('.J_follow_btn[data-qid='+questionId+']').attr('data-num',newNum);
                $('.J_follow_btn[data-qid='+questionId+']').text('取消关注(' + newNum + ')');
                $('.J_follow_btn[data-qid='+questionId+']').attr('data-follow',1);
            }
            publicObj.followLock = false;
        },function(error_no,error_msg){
            layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
            publicObj.followLock = false;
        });
    },
    //举报参数初始化
    doReportInit : function(obj){
        if(publicObj.reportLock){
            layer.msg('正在加载中...', {icon: 2, 'time': 1500, 'shade': 0.3});
            return false;
        }
        var _self       = obj; 
        var answerId    = parseInt(_self.attr('data-aid'));
        var questionId  = parseInt(_self.attr('data-qid'));
        $('#J_report_submit').attr('data-aid',answerId);
        $('#J_report_submit').attr('data-qid',questionId);
        _self.attr('data-unique','btn_'+answerId+'_'+questionId);
    },
    //举报提交
    doReport : function(obj){
        if(publicObj.reportLock){
            layer.msg('正在加载中...', {icon: 2, 'time': 1500, 'shade': 0.3});
            return false;
        }
        publicObj.reportLock = true;
        var _self       = obj; 
        var answerId    = parseInt(_self.attr('data-aid'));
        var questionId  = parseInt(_self.attr('data-qid'));
        var typeId      = parseInt($('#J_report_type_div .checkbox-btn-act').attr('data-type'));
        var content     = $('#J_report_content').val();
        if(!answerId || !userId || !questionId || !content){
            layer.msg('请填写内容!', {icon: 2, 'time': 1500, 'shade': 0.3});
            publicObj.reportLock = false;
            return false;
        }
        BTF.post("Inform/Add","answer_id=" + answerId + "&user_id=" + userId + "&question_id=" + questionId + "&type=" + typeId + "&content=" + content, function(data){
            _self.text('已举报');
            $('.J_report_btn[data-unique=btn_'+answerId+'_'+questionId+']').text('已举报').removeClass('J_report_btn');
            $('.report-layer-close-btn').click();
            publicObj.reportLock = false;
        },function(error_no,error_msg){
            layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
            publicObj.reportLock = false;
        });
    },
    //关注该问题的人加载更多的相关处理
    getMoreFollowAskUsers : function(obj){
        if(askIndexM.followAskUsersLock){
            layer.msg('正在加载中...', {icon: 2, 'time': 1500, 'shade': 0.3});
            return false;
        }
        askIndexM.followAskUsersLock = true;
        obj.text('加载中...');
        var _self       = obj;
        var questionId  = parseInt(_self.attr('data-questionId'));
        var page        = parseInt(_self.attr('data-page'));
        var status      = parseInt(_self.attr('data-status'));
        if(status !== 1 || page < 2){
            askIndexM.followAskUsersLock = false;
            obj.text('点击查看更多');
            return false;
        }
        //
        BTF.post("Question/AjaxFollowAskUsers","&questionId=" + questionId + "&page=" + page, function(data){
            if(data.state == 1){
                $('#J_followAskUsersDiv').append(data.dataHtml);
                _self.attr('data-page',page+1);
            }else{
                layer.msg(data.msg, {icon: 2, 'time': 1500, 'shade': 0.3});
                _self.hide();
            }
            if(data.isLastPage > 0){
                _self.hide();
            }
            askIndexM.followAskUsersLock = false;
            obj.text('点击查看更多');
        },function(error_no,error_msg){
            layer.msg(error_msg, {icon: 2, 'time': 1500, 'shade': 0.3});
            askIndexM.followAskUsersLock = false;
            obj.text('点击查看更多');
        });
    }
};
publicObj.init();