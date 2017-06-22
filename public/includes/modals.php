<form class="modal modal-callback" id="modal-callback">
    <div class="title">
        Форма обратного звонка
    </div>
    <div class="label">
        ФИО
    </div>
    <input class="textbox" type="text" name="name" placeholder="">
    <div class="label">
        Телефон
    </div>
    <input class="textbox" type="tel" name="phone" placeholder="">
    <div class="label">
        Удобное время звонка
    </div>
    <input class="textbox" type="text" name="time" placeholder="">
    <div class="g-recaptcha" data-sitekey="6LcDSAsUAAAAABWsmcpgr7L6AD1kHRedmiSMWFh1"></div>
    <button class="button" type="submit">
        Заказать звонок
    </button>
</form>

<form class="modal modal-order" id="modal-order">
    <div class="title">
        Вызов замерщика
    </div>
    <div class="columns">
        <div class="column">
            <div class="label">
                ФИО
            </div>
            <input class="textbox" type="text" name="name" placeholder="">
            <div class="label">
                Телефон
            </div>
            <input class="textbox" type="tel" name="phone" placeholder="">
            <div class="label">
                Адрес
            </div>
            <input class="textbox" type="text" name="address" placeholder="">
        </div>
        <div class="column">
            <div class="label">
                Желательное время
            </div>
            <input class="textbox" type="text" name="time" placeholder="">
            <div class="label">
                Комментарий
            </div>
            <textarea class="textbox" name="comment" rows="6" placeholder=""></textarea>
        </div>
    </div>
    <div class="g-recaptcha" data-sitekey="6LcDSAsUAAAAABWsmcpgr7L6AD1kHRedmiSMWFh1"></div>
    <button class="button" type="submit">
        Отправить
    </button>
</form>