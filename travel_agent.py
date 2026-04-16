import autogen
from autogen import AssistantAgent, UserProxyAgent
import os

# API 키 설정 (환경 변수에서 가져옴)
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    api_key = input("OpenAI API 키를 입력하세요: ")

config_list = [
    {
        "model": "gpt-4",  # 또는 gpt-3.5-turbo
        "api_key": api_key,
    }
]

# 여행 추천 에이전트 생성
travel_assistant = AssistantAgent(
    name="TravelAssistant",
    llm_config={
        "config_list": config_list,
        "temperature": 0.7,
    },
    system_message="You are a helpful travel assistant. Provide detailed travel recommendations including places to visit, food, and tips."
)

# 사용자 프록시 에이전트
user_proxy = UserProxyAgent(
    name="UserProxy",
    human_input_mode="ALWAYS",  # 사용자 입력을 항상 요구
    code_execution_config=False,  # 코드 실행 비활성화
)

def get_travel_recommendation(destination):
    """
    여행지 추천을 받는 함수
    """
    message = f"Please provide a detailed travel recommendation for {destination}. Include must-visit places, local cuisine, and travel tips."

    # 대화 시작
    user_proxy.initiate_chat(
        travel_assistant,
        message=message,
    )

if __name__ == "__main__":
    # 예시 실행
    destination = input("어디로 여행 가고 싶으세요? ")
    get_travel_recommendation(destination)