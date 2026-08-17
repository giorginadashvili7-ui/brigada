lucide.createIcons();

        // Custom Dropdown Logic for Main Form Service
        function toggleDropdown() {
            const menu = document.getElementById('dropdownMenu');
            const chevron = document.getElementById('dropdownChevron');
            menu.classList.toggle('hidden');
            chevron.classList.toggle('rotate-180');
        }

        function selectService(value, label) {
            document.getElementById('service').value = value;
            const textElem = document.getElementById('selectedServiceText');
            textElem.textContent = label;
            textElem.classList.remove('text-slate-400');
            textElem.classList.add('text-white');
            toggleDropdown();
        }

        // Custom Dropdown Logic for Calculator Service
        function toggleCalcDropdown() {
            const menu = document.getElementById('calcDropdownMenu');
            const chevron = document.getElementById('calcDropdownChevron');
            menu.classList.toggle('hidden');
            chevron.classList.toggle('rotate-180');
        }

        function selectCalcService(value, label) {
            document.getElementById('calcService').value = value;
            const textElem = document.getElementById('selectedCalcServiceText');
            textElem.textContent = label;
            toggleCalcDropdown();
            calculatePrice();
        }

        window.addEventListener('click', function(e) {
            const toggle = document.getElementById('dropdownToggle');
            const menu = document.getElementById('dropdownMenu');
            const chevron = document.getElementById('dropdownChevron');
            if (toggle && menu && chevron && !toggle.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.add('hidden');
                chevron.classList.remove('rotate-180');
            }

            const calcToggle = document.getElementById('calcDropdownToggle');
            const calcMenu = document.getElementById('calcDropdownMenu');
            const calcChevron = document.getElementById('calcDropdownChevron');
            if (calcToggle && calcMenu && calcChevron && !calcToggle.contains(e.target) && !calcMenu.contains(e.target)) {
                calcMenu.classList.add('hidden');
                calcChevron.classList.remove('rotate-180');
            }
        });

        // Photo file selection handler
        function handlePhotoSelect(e) {
            const files = e.target.files;
            const label = document.getElementById('photoLabel');
            if (files.length > 0) {
                if (files.length === 1) {
                    label.textContent = files[0].name;
                } else {
                    label.textContent = `არჩეულია ფოტო: ${files.length}`;
                }
                label.classList.remove('text-slate-400');
                label.classList.add('text-white');
            } else {
                label.textContent = 'აირჩიეთ ფოტო(ები)...';
                label.classList.add('text-slate-400');
                label.classList.remove('text-white');
            }
        }

        // Calculator Logic
        function calculatePrice() {
            const rate = parseFloat(document.getElementById('calcService').value);
            const area = parseInt(document.getElementById('calcArea').value);
            document.getElementById('areaValue').textContent = area + ' მ²';
            const total = rate * area;
            document.getElementById('totalPrice').textContent = total.toLocaleString() + ' ₾';
        }
        calculatePrice();

        // FAQ Toggle
        function toggleFaq(element) {
            const p = element.querySelector('p');
            const icon = element.querySelector('i');
            p.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        }

        // Drag/Touch support for Marquee
        const slider = document.getElementById('draggableMarquee');
        let isDown = false;
        let startX;
        let scrollLeft;

        if (slider) {
            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                slider.classList.add('is-dragging');
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('mouseleave', () => {
                isDown = false;
                slider.classList.remove('is-dragging');
            });

            slider.addEventListener('mouseup', () => {
                isDown = false;
                slider.classList.remove('is-dragging');
            });

            slider.addEventListener('mousemove', (e) => {
                if(!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
            });

            slider.addEventListener('touchstart', (e) => {
                isDown = true;
                slider.classList.add('is-dragging');
                startX = e.touches[0].pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });

            slider.addEventListener('touchend', () => {
                isDown = false;
                slider.classList.remove('is-dragging');
            });

            slider.addEventListener('touchmove', (e) => {
                if(!isDown) return;
                const x = e.touches[0].pageX - slider.offsetLeft;
                const walk = (x - startX) * 2;
                slider.scrollLeft = scrollLeft - walk;
            });
        }

        // Telegram Bot Integration with Photos and Enhanced Styling
        async function handleFormSubmit(event) {
            event.preventDefault();
            
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            const specificService = document.getElementById('specificService').value;
            const location = document.getElementById('location').value;
            const photoInput = document.getElementById('photoInput');

            if(!service) {
                alert('გთხოვთ აირჩიოთ სერვისი!');
                return;
            }

            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const originalText = btnText.textContent;
            
            submitBtn.disabled = true;
            btnText.textContent = 'იგზავნება...';

            const botToken = '8927268209:AAFvkPcGOgOetRNA-5UvePrXmZjvMtLLna8';
            const chatId = '-1004347228892';

            const currentTime = new Date().toLocaleTimeString('ka-GE', { hour: '2-digit', minute: '2-digit' });
const currentDate = new Date().toLocaleDateString('ka-GE', { day: '2-digit', month: '2-digit', year: 'numeric' });

const message = `✨ <b>ახალი განაცხადი საიტიდან!</b> ✨

━━━━━━━━━━━━━━━━━━━
📞 <b>ტელეფონი:</b> <code>${phone || 'მითითებული არ არის'}</code>

🛠 <b>სერვისი:</b> <b>[ ${service || 'მითითებული არ არის'} ]</b>
${specificService ? `\n📝 <b>კონკრეტული სერვისი:</b>\n<i>↳ ${specificService}</i>\n` : ``}${location ? `\n📍 <b>მდებარეობა:</b>\n<b>↳ ${location}</b>\n` : ``}
━━━━━━━━━━━━━━━━━━━
🕒 <i>${currentDate} • ${currentTime}</i>`.trim();

            try {
                if (photoInput.files && photoInput.files.length > 0) {
                    if (photoInput.files.length === 1) {
                        const formData = new FormData();
                        formData.append('chat_id', chatId);
                        formData.append('photo', photoInput.files[0]);
                        formData.append('caption', message);
                        formData.append('parse_mode', 'HTML');

                        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                            method: 'POST',
                            body: formData
                        });
                        const data = await res.json();
                        if (!data.ok) throw new Error('Photo send failed');
                    } else {
                        const media = [];
                        const formData = new FormData();
                        formData.append('chat_id', chatId);

                        for (let i = 0; i < photoInput.files.length; i++) {
                            const fileKey = `photo${i}`;
                            formData.append(fileKey, photoInput.files[i]);
                            media.push({
                                type: 'photo',
                                media: `attach://${fileKey}`,
                                caption: i === 0 ? message : '',
                                parse_mode: i === 0 ? 'HTML' : undefined
                            });
                        }
                        formData.append('media', JSON.stringify(media));

                        const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMediaGroup`, {
                            method: 'POST',
                            body: formData
                        });
                        const data = await res.json();
                        if (!data.ok) throw new Error('Media group send failed');
                    }
                } else {
                    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            chat_id: chatId,
                            text: message,
                            parse_mode: 'HTML'
                        })
                    });
                    const data = await response.json();
                    if (!data.ok) throw new Error('Text message send failed');
                }

                const modal = document.getElementById('success-modal');
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                
                event.target.reset();
                document.getElementById('selectedServiceText').textContent = 'აირჩიეთ სერვისი';
                document.getElementById('selectedServiceText').classList.add('text-slate-400');
                document.getElementById('selectedServiceText').classList.remove('text-white');
                document.getElementById('photoLabel').textContent = 'აირჩიეთ ფოტო(ები)...';
                document.getElementById('photoLabel').classList.add('text-slate-400');
                document.getElementById('photoLabel').classList.remove('text-white');

            } catch (error) {
                console.error('Telegram Error:', error);
                alert('გაგზავნისას მოხდა შეცდომა. გთხოვთ სცადოთ თავიდან.');
            } finally {
                submitBtn.disabled = false;
                btnText.textContent = originalText;
            }
        }

        function closeModal() {
            const modal = document.getElementById('success-modal');
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }