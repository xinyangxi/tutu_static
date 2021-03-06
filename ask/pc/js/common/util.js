var askUtil = {
    isAuto : 0,
	showAll: function(){
		$('.wrapper').on('click','[data-dom="show_askinfo_all"]',function(){
			var slef = $(this);
			var showId = $(slef).data('id');
			$('.wrapper').find('[data-show-id="'+showId+'"]').show();
			$('.wrapper').find('[data-hide-id="'+showId+'"]').hide();
		});
	},
    showWechat:function(){
        $('body').on('mouseenter','[data-dom="show_wechat_qrcode"]',function(){
			
			$('body').find('.footer-wechat-qrcode').show();

		});
        $('body').on('mouseleave','[data-dom="show_wechat_qrcode"]',function(){
			
			$('body').find('.footer-wechat-qrcode').hide();

		});
    },
    renderAskLayer: function($btn){
       var _this = this;
       var render = function(){
            var tpl = '<div class="ask-layer-wrap J_Editor">'+
                '<div class="layer-close-btn"></div>'+
                '<span class="title">提问</span>'+
                '<span class="subtitle">请填写你的问题</span>'+
                '<textarea class="main-text"  id="J_Title"></textarea>'+
                '<span class="subtitle">补充说明你的问题（可选）</span>'+
                '<div class="sub-text" id="J_QuestionEditor"></div>'+
                '<div class="layer-bottom">'+
                '<span class="bottom-item icon-emote J_Emote">表情</span>'+
                '<span class="bottom-item icon-img J_Image">图片</span>'+
                '<span id="J_QuestionAnony" class="bottom-item icon-anonymous J_CheckBox" >匿名发布</span>'+
                '</div>'+
                '<span class="commit-btn" id="J_SaveQuestion">发布</span>'+
            '</div>';
            var askLayer =  layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: false,
                area:['735px','480px'],
                skin: 'layer-wrapper',
                content: tpl,
                success:function(){
                    tutuEditor.init('J_QuestionEditor');
                    var  titleKey  = "user-question-title",conKey = "user-question-content";
                    $('#J_Title').val(tutuEditor.getStorage(titleKey));
                    var  con  = tutuEditor.getStorage(conKey);
                    con != null && tutuEditor.getEditorObj('J_QuestionEditor') && tutuEditor.getEditorObj('J_QuestionEditor').setContent(con);
                    
                }
            });
            $('.layer-close-btn').on('click',function(){
                layer.close(askLayer);
            });
        };
        $(document).on('click',$btn,function(){
            _this.isAutoSave = $(this).attr('data-autosave');
            if(_this.isAutoSave == '0' ){
                tutuEditor.stopStorage(false);
            }else{
                tutuEditor.stopStorage(true);
            }
            render();
        });
        _this.initSaveQuestion();
        
    },
    renderUploadLayer: function(){
        var tpl2 = '<div class="ask-layer-wrap">'+
                '<div class="layer-close-btn upload-layer-close-btn"></div>'+
                '<span class="title">提问</span>'+
                '<span class="upload-subtitle">插入图片<span>或</span>引用站外图片</span>'+
                '<div class="upload-layer-input-wrap">'+
                '<input type="text" class="upload-input">'+
                '<span class="upload-btn">确认</span>'+
                '</div>'+
                '<span class="upload-tips">请不要上传与问答无关的图片，详细请看<a href="###">途途试道使用规范</a></span>'
                '</div>';
        var uploadLayer =  layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: false,
                area:['735px','480px'],
                skin: 'layer-wrapper',
                content: tpl2
            });
            $('.upload-layer-close-btn').on('click',function(){
                layer.close(uploadLayer);
            });
    },
    renderReportLayer: function(){
         var tpl3 = '<div class="ask-layer-wrap report-layer-wrap">'+
                '<div class="layer-close-btn report-layer-close-btn"></div>'+
                '<span class="title">举报</span>'+
                '<div class="checkbox-wrap" id="J_report_type_div">'+
                '<span class="checkbox-btn" data-type="1">广告</span>'+
                '<span class="checkbox-btn" data-type="2">造谣</span>'+
                '<span class="checkbox-btn-act" data-type="3">侵权</span>'+
                '<span class="checkbox-btn" data-type="4">色情</span>'+
                '<span class="checkbox-btn" data-type="5">政治</span>'+
                '</div>'+
                '<textarea class="explanation-textarea" id="J_report_content"></textarea>'+
                
                '<span class="commit-btn" id="J_report_submit">提交</span>'
                '</div>';
         var reportLayer =  layer.open({
                type: 1,
                title: false,
                closeBtn: 0,
                shadeClose: false,
                area:['735px','380px'],
                skin: 'layer-wrapper',
                content: tpl3
            });
        $('.report-layer-close-btn').on('click',function(){
            layer.close(reportLayer);
        });
        
        //举报类型选择交互
        $(document).on('click','#J_report_type_div .checkbox-btn',function(){
            if($(this).hasClass('checkbox-btn-act')){
                return;
            }
            $('#J_report_type_div .checkbox-btn-act').removeClass('checkbox-btn-act').addClass('checkbox-btn');
            $(this).addClass('checkbox-btn-act').removeClass('checkbox-btn');
        });
    },
    renderInvitationLayer: function(){
        var tpl = '<div class="invitation-layer-wrap">'+
                '<div class="layer-close-btn invitation-layer-close-btn"></div>'+
                '<span class="title">邀请好友加入“车知小组”问答圈</span>'+
                '<div class="invitation-input-item-wrap">'+
                '<span class="label">邀请链接：</span>'+
                '<input type="text" class="invitation-input">'+
                '<span class="invitation-copy-btn border border-all ">复制</span>'+
                '<span class="invitation-tip">被邀请用户访问邀请链接，登录并完成问卷即可开通功能</span>'+
                '</div>'+
                '<div class="invitation-input-item-wrap">'+
                '<span class="label">邀请链接：</span>'+
                '<input type="text" class="invitation-input">'+
                '<span class="invitation-copy-btn border border-all ">复制</span>'+
                '<span class="invitation-tip">被邀请用户访问邀请链接，登录并完成问卷即可开通功能</span>'+
                '</div>'+
               
                '<span class="commit-btn">提交</span>'
                '</div>';
        
         var askLayer =  layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: false,
            area:['735px','360px'],
            skin: 'layer-wrapper',
            content: tpl
        });
    },
    //发布问题
    initSaveQuestion:function(){  
            if(typeof tutuEditor =='undefined'){
                return false;
            }
            var  titleKey  = "user-question-title",conKey = "user-question-content";
            $(document).on('keyup','#J_Title',function(){
                    tutuEditor.setStorage(titleKey,$(this).val());
            });
            var oldContent = '';
            var t  =  setInterval(function(){
                if(tutuEditor.getEditorObj('J_QuestionEditor')){
                    var c  = tutuEditor.getEditorObj('J_QuestionEditor').getContent();
                    if(c!=oldContent){
                        tutuEditor.setStorage(conKey,c);
                    }
                    oldContent = c;
                }
            },5000);
            
            $(document).on('click','#J_SaveQuestion',function(){
                clearInterval(t);
                tutuEditor.setCurEditor('J_QuestionEditor');
                var  title   =  $('#J_Title').val(),content  = tutuEditor.getContent(); 
                    if(title == '' || $.trim(title) == ''){
                        dialog.msg('填写的问题不能为空');
                        return false;
                    }  
                    var  isAnony  =  0;
                    if($('#J_QuestionAnony').hasClass('icon-anonymous-act')){
                            isAnony  = 1;
                    }
                    BTF.post("Question/SaveQuestion","title="+title+"&content="+content+'&is_anony='+isAnony,function(data){
                            if(data.state == 1){
                                tutuEditor.clearStorage(titleKey);
                                tutuEditor.clearStorage(conKey);
                                dialog.ok(data.msg,function(){
                                    location =  document.URL;
                                    layer.closeAll();
                                });
                            }else{
                                dialog.error(data.msg);
                            }
                },function(error_no,error_msg){
                            dialog.error();
                }); 
            });
   },
    playHover: function(container,flayer,top){
        $(container).on('mouseenter',function(){
            var self = $(this);
            $(self).find(flayer).animate({top:"0"});
        });
        $(container).on('mouseleave',function(){
            var self = $(this);
            $(self).find(flayer).animate({top:top+"px"});
        });
    },
    renderSearch:function(){
        var tpl = ' <div class="search-dialog-bg">'+
        '<div class="search-input-wrap">'+
            '<input type="text" class="search-input" placeholder="输入你感兴趣的词">'+
            '<span class="search-btn"></span>'+
        '</div>'+
        '<div class="search-hot-wrap">'+
            '<span class="search-hot-title">热门搜索</span>'+
            '<span class="search-hot-tip">suv</span>'+
            '<span class="search-hot-tip">汽车测评</span>'+
            '<span class="search-hot-tip">质量报告</span>'+
            '<span class="search-hot-tip">智能汽车</span>'+
            '<span class="search-hot-tip">国产suv改装</span>'+
            '<span class="search-hot-tip">自动驾驶</span>'+
            '<span class="search-hot-tip">啊啊啊</span>'+
        '</div>'+
    '</div>';
        $('body').append(tpl);
    },
    renderSearch:function(){
        var tpl = ' <div class="search-dialog-bg">'+
            '<span class="search-dialog-close-btn"></span>'+
        '<div class="search-input-wrap">'+
            '<input type="text" class="search-input" placeholder="输入你感兴趣的词">'+
            '<span class="search-btn"></span>'+
        '</div>'+
        '<div class="search-hot-wrap">'+
            '<span class="search-hot-title">热门搜索</span>'+
            '<span class="search-hot-tip">suv</span>'+
            '<span class="search-hot-tip">汽车测评</span>'+
            '<span class="search-hot-tip">质量报告</span>'+
            '<span class="search-hot-tip">智能汽车</span>'+
            '<span class="search-hot-tip">国产suv改装</span>'+
            '<span class="search-hot-tip">自动驾驶</span>'+
            '<span class="search-hot-tip">啊啊啊</span>'+
        '</div>'+
    '</div>';
        $('body').append(tpl);
        $('.search-dialog-close-btn').on('click',function(){
            $('.search-dialog-bg').remove();
        })
    }
};
