let meals = [];

function addMeal() {
    const mealType = document.getElementById('mealType').value;
    const mealName = document.getElementById('mealName').value;
    const calories = parseInt(document.getElementById('calories').value);

    if (mealName && !isNaN(calories)) {
        const mealData = {
            tipoRefeicao: mealType,
            descricao: mealName,
            calorias: calories,  // Substitua pelo valor correto
            usuario: {  // Substitua pelo valor correto
                nome: "Nome do Usuário",  // Substitua pelo valor correto
                email: "email@exemplo.com"  // Substitua pelo valor correto
            }
        };

        // Enviar dados para a API usando fetch
        fetch('https://localhost:7017/api/Refeicao/CadastrarRefeicao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mealData),
        })
        .then(response => response.json())
        .then(data => {
            // Lógica adicional após salvar os dados (se necessário)
            console.log('Refeição adicionada com sucesso:', data);
            meals.push({ mealName, calories });
            displayMeals();
            calculateTotalCalories();
            clearForm();
        })
        .catch(error => {
            console.error('Erro ao salvar refeição:', error);
            alert('Erro ao salvar refeição. Por favor, tente novamente.');
        });
    } else {
        alert('Por favor, preencha o nome da refeição e as calorias corretamente.');
    }
}


function displayMeals() {
    const mealList = document.getElementById('mealList');
    mealList.innerHTML = '';

    meals.forEach((meal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${meal.mealType}</td>
            <td>${meal.mealName}</td>
            <td>${meal.calories}</td>
            <td><button onclick="deleteMeal(${index})">Excluir</button></td>
        `;
        mealList.appendChild(row);
    });
}

function deleteMeal(index) {
    meals.splice(index, 1);
    displayMeals();
    calculateTotalCalories();
}

function calculateTotalCalories() {
    const totalCalories = meals.reduce((total, meal) => total + meal.calories, 0);
    document.getElementById('totalCalories').textContent = `Total de Calorias: ${totalCalories}`;
}

function clearForm() {
    document.getElementById('mealName').value = '';
    document.getElementById('calories').value = '';
}

