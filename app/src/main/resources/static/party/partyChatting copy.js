const Chat = (function(){
    
    // 여기에다가 세션으로 사용자의 닉네임을 받아서 백틱으로 집어넣으면 되겠다!
    const myName = "개코";

    // init 함수
    function init() {
        // enter 키 이벤트
        $(document).on('keydown', 'div.input-div textarea', function(e){ // keydown: 키보드를 누를 때 실행. 키를 누르고 있을 때 단 한번만 실행
            if(e.keyCode == 13 && !e.shiftKey) { // keyCode: 13 -> enter // !e.shiftKey : shift 키가 눌리지 않았으면
                e.preventDefault();  // a 태그나 submit 태그는 누르게 되면 href 를 통해 이동하거나 , 창이 새로고침하여 실행됩니다. preventDefault 를 통해 이러한 동작을 막아줄 수 있습니다.
                
                const message = $(this).val();

                // 메시지 전송
                sendMessage(message);
                // 입력창 clear
                clearTextarea();
            }
        });
    }

    // 메시지 태그 생성
    function createMessageTag(LR_className, senderName, message) {
        // 형식 가져오기
        let chatLi = $('div.chat.format ul li').clone();

        // 값 채우기
        chatLi.addClass(LR_className);
        chatLi.find('.sender span').text(senderName);
        chatLi.find('.message span').text(message);

        return chatLi;
    }

    // 메시지 태그 append
    function appendMessageTag(LR_className, senderName, message) {
        const chatLi = createMessageTag(LR_className, senderName, message);

        $('div.chat:not(.format) ul').append(chatLi);  // 필터셀렉터 - : 콜론을 포함하는 셀렉터

        // 스크롤바 아래 고정
        $('div.chat').scrollTop($('div.chat').prop('scrollHeight')); // $('').scrollTop() : 선택한 요소의 스크롤바 수직 위치를 가져온다. // $(ele).prop('scrollHeight') : scroll되어 나타나는 부분까지 높이를 반환합니다. // .prop() 메서드는 JavaScript 요소의 속성 값을 설정하거나 반환합니다. // scrollHeight : 요소에 들어있는 컨텐츠의 전체 높이
    }

    // 메시지 전송
    function sendMessage(message) {
        // 서버에 전송하는 코드로 후에 대체
        const data = {
            "senderName"    : "개코",
            "message"        : message
        };

        // 통신하는 기능이 없으므로 여기서 receive
        resive(data);
    }

    // 메시지 입력박스 내용 지우기
    function clearTextarea() {
        $('div.input-div textarea').val('');
    }

    // 메시지 수신  // ????이 사람 맞춤법 틀렸는디
    function resive(data) {
        const LR = (data.senderName != myName)? "left" : "right";
        appendMessageTag("right", data.senderName, data.message);
    }

    return {
        'init': init
    };
})();


$(function(){ // html 문서가 로딩되면 chat의 init 함수를 호출하라
    Chat.init();
});